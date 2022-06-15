"use strict";
const inputName = document.getElementById("name");
const inputPass = document.getElementById("pass");
const inputRPass = document.getElementById("rpass");
const cadastrarButton = document.getElementById("button");
function cadastrar() {
    if (!verificarNome(inputName.value)) {
        return alert("Insira um nome válido");
    }
    if (!verificarSenhas(inputPass.value, inputRPass.value)) {
        return alert("Insira uma senha válida");
    }
    const user = {
        name: inputName.value,
        pass: inputPass.value
    };
    let users = [];
    if (window.localStorage.getItem('users')) {
        users = JSON.parse(window.localStorage.getItem('users'));
    }
    window.localStorage.setItem('users', JSON.stringify(user));
    alert(`Conta de ${inputName.value} Cadastrada com sucesso!`);
    limparForms();
    return;
}
function verificarSenhas(pass, rpass) {
    if (pass === rpass && pass.length >= 3) {
        return true;
    }
    return false;
}
function verificarNome(name) {
    if (name.length >= 3) {
        return true;
    }
    return false;
}
function limparForms() {
    inputName.value = "";
    inputPass.value = "";
    inputRPass.value = "";
}
