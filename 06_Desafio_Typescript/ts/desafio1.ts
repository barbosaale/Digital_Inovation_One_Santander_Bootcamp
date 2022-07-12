// Como podemos rodar isso em um arquivo .ts sem causar erros? 

interface employees  {
    code: number;
    name: string; 
}

let employee: employees = {
    'code':  10,
    'name': "John"
};

console.log(employee);