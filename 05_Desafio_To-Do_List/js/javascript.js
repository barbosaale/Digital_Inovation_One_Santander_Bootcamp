var btnAdicionar = document.getElementById('form-input');
btnAdicionar.addEventListener('submit', adicionaTarefa);

function removerTarefa(event){
    
    var elemento_clicado = event.target;

    if (elemento_clicado.classList.contains("remover")){
        event.preventDefault();
        
        var rem = elemento_clicado.closest("div .wrapper-list");
        //rem.innerHTML = "";
        rem.parentNode.removeChild(rem);

    }

}


function adicionaTarefa(event){
    event.preventDefault();
    var tarefa = document.getElementById('input');

    var elemento = document.getElementsByClassName('wrapper-list')

    var num_item = elemento.length;
    
    if (num_item > 0){
        var conteudo_lista = 
        `<div class="wrapper-list">
            <input type="checkbox" name="list${num_item+1}"> 
            <label for="list${num_item+1}">${tarefa.value}</label> 
            <input type="submit" class="remover" value="Remover">
        </div>`;

        var ultimo_elemento = elemento[elemento.length -1];
        ultimo_elemento.insertAdjacentHTML('afterend', conteudo_lista);

        var click_tarefa = document.getElementsByClassName('list')[0];

    } else {
        var conteudo_lista = 
        `<div class="wrapper-list">
            <input type="checkbox" name="list1"> 
            <label for="list1">${tarefa.value}</label> 
            <input type="submit" class="remover" value="Remover">
        </div>`;

        document.getElementsByClassName('list')[0]
            .insertAdjacentHTML('afterbegin', conteudo_lista);

        var click_tarefa = document.getElementsByClassName('list')[0];

    }

    click_tarefa.addEventListener('click', removerTarefa);
    click_tarefa.addEventListener('click', marcarConcluido);

    tarefa.value  = '';
}


function marcarConcluido(event){
    var elemento_clicado = event.target;

    if (elemento_clicado.getAttribute('type')=='checkbox'){
        var tarefa = elemento_clicado.getAttribute('name');
        var elemento_tarefa = document.querySelectorAll(`[for=${tarefa}]`)[0];
        if (elemento_clicado.checked){
            elemento_tarefa.style.textDecoration = "line-through";
        }else{
            elemento_tarefa.style.textDecoration = "none";
        }
    }

}
































