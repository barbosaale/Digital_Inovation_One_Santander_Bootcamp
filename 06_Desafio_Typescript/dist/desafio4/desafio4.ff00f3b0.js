let apiKey = "557108d3bcc9db8041883d6483be95e8";
let requestToken;
let username;
let password;
let sessionId;
let listId;
let loginButton = document.getElementById("login-button");
let searchButton = document.getElementById("search-button");
let searchContainer = document.getElementById("search-container");
loginButton.addEventListener("click", async (e)=>{
    e.preventDefault();
    await criarRequestToken();
    await logar();
    await criarSessao();
//console.log('clicou');
});
var page = 1;
var butNext = false;
let cnext = false;
let cprev = false;
var listaDeFilmes;
let numPag;
var buttonNext;
var buttonPrev;
searchButton.addEventListener("click", async (e1)=>{
    e1.preventDefault();
    console.log("debug1:", e1.target);
    let lista = document.getElementById("lista");
    if (lista) lista.outerHTML = "";
    if (cnext === false) page = 1;
    let query = document.getElementById("search")?.value;
    listaDeFilmes = await procurarFilme(`${query}&page=${page}`);
    searchContainer.innerHTML = "";
    for (const item of listaDeFilmes.results){
        let index = listaDeFilmes.results.indexOf(item);
        //console.log('index: ', index)
        let div = document.createElement("div");
        div.id = "item_" + index;
        div.className = "item";
        let div_img = document.createElement("img");
        div_img.src = "https://image.tmdb.org/t/p/original/" + item.poster_path;
        div.appendChild(div_img);
        // movie percent
        let div_percent = document.createElement("div");
        div_percent.className = "percent";
        div.appendChild(div_percent);
        let text_percent = Math.round(Number(item.vote_average) * 10).toString();
        div_percent.innerHTML = `<div id="i${index}" class="c100 p${text_percent} small">
            <span>${text_percent}%</span>
            <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
            </div>
        </div>
        `;
        requestAnimationFrame(()=>{
            let div_c100 = document.getElementById("i" + index);
            //console.log('div_c100: ', div_c100);
            let color_percent;
            if (Number(item.vote_average) * 10 <= 33) color_percent = "red";
            else if (Number(item.vote_average) * 10 > 33 && Number(item.vote_average) * 10 <= 66) color_percent = "orange";
            else color_percent = "green";
            try {
                div_c100.classList.add(color_percent);
            } catch (e) {
            //
            }
        });
        let name_title = document.createElement("div");
        name_title.className = "name_title";
        div.appendChild(name_title);
        name_title.innerHTML = `<span class="title">${item.original_title}</span>
        </br>
        <span>${item.release_date}</span>
        `;
        searchContainer.appendChild(div);
    }
    numPag = Number(listaDeFilmes.total_pages);
    console.log("N\xfamero de p\xe1ginas: ", numPag);
    if (numPag > 1) {
        var indexpagina = document.createElement("div");
        indexpagina.classList.add("indexpagina");
        indexpagina.innerHTML = `<a href="" class="previous round">&#8249;</a>
            <a href="" class="next round">&#8250;</a>`;
        let wrapperPesquisa = document.querySelectorAll(".wrapper.pesquisa")[0];
        //console.log('wrapperPesquisa: ', wrapperPesquisa);
        if (document.querySelectorAll(".next")[0] === undefined) wrapperPesquisa.appendChild(indexpagina);
    }
    cnext = false;
    cprev = false;
    buttonNext = document.querySelectorAll(".next")[0];
    buttonPrev = document.querySelectorAll(".previous")[0];
    requestAnimationFrame(()=>{
        buttonNext.addEventListener("click", (e)=>{
            e.preventDefault();
            cnext = true;
            if (page <= numPag && cnext === true) {
                page += 1;
                searchButton.click();
            }
        });
        buttonPrev.addEventListener("click", (e)=>{
            e.preventDefault();
            cprev = true;
            if (page > 1 && cprev === true) {
                page -= 1;
                searchButton.click();
            }
        });
    });
    console.log(listaDeFilmes);
});
// - - Events originated in the html - - - 
function preencherSenha() {
    password = document.getElementById("senha")?.value;
    validateLoginButton();
}
function preencherLogin() {
    username = document.getElementById("login")?.value;
    validateLoginButton();
}
function preencherApi() {
    apiKey = document.getElementById("api-key")?.value;
    validateLoginButton();
}
// - - - - - - - - - - - - - - - - - - - - - - 
function validateLoginButton() {
    if (password && username && apiKey) loginButton.disabled = false;
    else loginButton.disabled = true;
}
class HttpClient {
    //static async get( url: string, method: string, body?: string ) {
    static async get({ url , method , body =null  }) {
        return new Promise((resolve, reject)=>{
            let request = new XMLHttpRequest();
            request.open(method, url, true);
            request.onload = ()=>{
                if (request.status >= 200 && request.status < 300) resolve(JSON.parse(request.responseText));
                else reject({
                    status: request.status,
                    statusText: request.statusText
                });
            };
            request.onerror = ()=>{
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            };
            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                body = JSON.stringify(body);
            }
            request.send(body);
        });
    }
}
async function procurarFilme(query) {
    query = encodeURI(query);
    console.log("query: ", query);
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    });
    return result;
}
async function adicionarFilme(filmeId) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    });
    console.log("debug1");
    console.log(result);
}
async function criarRequestToken() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    });
    requestToken = result.request_token;
    console.log("RequestToken: ", requestToken);
}
async function logar() {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }
    });
}
async function criarSessao() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    });
    sessionId = result.session_id;
}
async function criarLista(nomeDaLista, descricao) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        }
    });
    console.log(result);
}
async function adicionarFilmeNaLista(filmeId, listaId) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    });
    console.log(result);
}
async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    });
    console.log(result);
}

//# sourceMappingURL=desafio4.ff00f3b0.js.map
