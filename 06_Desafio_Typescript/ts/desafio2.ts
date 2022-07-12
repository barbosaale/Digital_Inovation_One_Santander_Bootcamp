// Como podemos melhorar o esse código usando TS? 

class Pessoa{
    nome: string;
    idade: number;
    profissao: string;

    constructor(nome: string, idade: number | string, profissao: string){
        this.nome = nome;
        this.idade = Number(idade);
        this.profissao = profissao;
    }

}


let pessoa1: Pessoa = new Pessoa(
    "Maria", 29, "atriz"
);

let pessoa2: Pessoa = new Pessoa(
    "Roberto", 19, "Padeiro"
);


let pessoa3: Pessoa = new Pessoa(
    "Laura", "32", "Atriz"
)

let pessoa4: Pessoa = new Pessoa(
    "Carlos", 19, "Padeiro"
);
   