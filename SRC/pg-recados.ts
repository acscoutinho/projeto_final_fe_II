
// JSON:
// parse => transforma de uma string para um objeto
// stringfy => transforma de um objeto para uma string
const form = document.querySelector("#infos_prod");
const corpoTabela = document.querySelector("#tbody");
const recuperarLocalStorage = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    return produtos;
};



const atualizarLocalStorage = (produtos) => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
};
const salvarProduto = (event) => {
    // remove o comportamento padrão do subtmit
    event.preventDefault();
    // pega as informações dos inputs no html e passa para as variaveis
    const nome = form === null || form === void 0 ? void 0 : form.nome.value;
    const preco = form === null || form === void 0 ? void 0 : form.preco.value;
    const prime = form === null || form === void 0 ? void 0 : form.prime.checked;
    // recupera a lista de produto no localStorage
    const produtos = recuperarLocalStorage();
    // insere o novo produto na lista
    produtos.push({
        id: definirID() + 1,
        nome,
        preco,
        prime,
    });
    // atualiza o localStorage com o novo produto adicionado
    atualizarLocalStorage(produtos);
    alert("Produto adicionado com sucesso");
    // atualiza a tabela com o novo produto adicionado
    preencherTabela();
    // limpa os inputs
    form.reset();
};
const preencherTabela = () => {
    // recupera a lista de produtos do localStorage
    const produtos = recuperarLocalStorage();
    // limpa a tabela no html
    corpoTabela.innerHTML = "";
    // percorre a lista de produtos
    for (const produto of produtos) {
        // para cada produto vamos criar uma linha nova no corpo da table
        corpoTabela.innerHTML += `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>R$${produto.preco}</td>
            <td>${produto.prime ? "Sim" : "Não"}</td>
            <td>
                <img src="./img/delet.svg" alt="imagem de lixeira" width="40" onclick="removeProduto(${produto.id})" >
            </td>
        </tr>
      `;
    }
};
const removeProduto = (id) => {
    // recupera a lista do localStorage
    const produtos = recuperarLocalStorage();
    // procura o indice do produto na lista conforme o identificado passado
    const indiceProduto = produtos.findIndex((produto) => produto.id === id);
    // quando o findIndex não encontra ele retorna -1
    // então por isso é verificado se o indice é menor que o 0
    if (indiceProduto < 0)
        return;
    // remove o produto da lista
    produtos.splice(indiceProduto, 1);
    // atualiza o localStorage
    atualizarLocalStorage(produtos);
    alert("Produto removido com sucesso");
    // atualiza a tabela no html
    preencherTabela();
};
const definirID = () => {
    // guardar o maior ID encontrado na lista de produtos
    let max = 0;
    // recupera a lista de produtos do localStorage
    const produtos = recuperarLocalStorage();
    // percorre a lista de produtos para atualizar e obter o maior
    produtos.forEach((produto) => {
        if (produto.id > max) {
            max = produto.id;
        }
    });
    return max;
};
// submit
// if (form !== null)
// variavel === undefined = FALSE
// variavel === null = FALSE
// variavel === 0 = FALSE
// variavel === "" = FALSE
// variavel !== undefined = TRUE
// variavel !== null = TRUE
// variavel === 1 = TRUE
// variavel === "qualquer valor" = TRUE
form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarProduto);
// assim que o conteúdo html é carregado é chamado a função para
// preencher a tabela com os produtos cadastrados
document.addEventListener("DOMContentLoaded", preencherTabela);