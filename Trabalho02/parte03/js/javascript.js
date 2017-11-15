let myUser;
let grupoAtual;
let botaoLogin = document.querySelector(".btn-login");
let modal = document.querySelector(".modal");
let modalForm = document.querySelector(".modal-form");
let modalInput = document.querySelector(".input-login");
let modalButton = document.querySelector(".button-entrar");
let conteiner = document.querySelector(".conteiner");

function carregarMeuUsuario() {
    let meuUsuario = document.querySelector("#meuUsuario");
    meuUsuario.textContent = myUser;
}

function openModal() {
    modal.classList.add("active");
    modalForm.classList.add("active");
    conteiner.classList.remove("active");
}

function closeModal() {
    modal.classList.remove("active");
    modalForm.classList.add("active");
    modalInput.value = "";
    conteiner.classList.add("active");
}

function logarUsuario() {
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("userid") != null){
            botaoLogin.textContent = "logout";
        } else {
            botaoLogin.textContent = "login";
        }
    }
}

function verificarLogin(){
    if(botaoLogin.textContent == "login"){
        openModal();
    }
    else{
        logout();
    }
}

function login(userId) {
    if(userId.length >= 3){
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("userid", userId);
            myUser = userId;
            carregarMeuUsuario();
            botaoLogin.textContent = "logout";
        }
        else{
            console.log("Desculpe, Navegador não suporta o aplicativo");
        }
    }
}

function logout(){
    if(typeof(Storage) !== "undefined"){
        localStorage.removeItem("userid");
        botaoLogin.textContent = "login";
        conteiner.classList.remove("active");
        openModal();
    }
}

function carregarClickBotoes() {
    let botaoLogin = document.querySelector(".btn-login");


    window.addEventListener("click", function () {
        if (event.target == modal) {
            closeModal();
        }
    });

    botaoLogin.addEventListener("click", verificarLogin);

    modalButton.addEventListener("click", function () {
        event.preventDefault();
        login(modalInput.value);
        closeModal();
    });
}

function updateMensagensScroll() {
    var element = document.querySelector(".mensagens");
    element.scrollTop = element.scrollHeight;
}

function getGrupos() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState == 4){
            let listaGrupos = JSON.parse(request.responseText);
            meusGrupos = listaGrupos;
            let grupos = document.querySelector(".grupos");
            if(grupos.childElementCount > 0){
                for(let x = grupos.childElementCount; x > 0; x--){
                    grupos.removeChild(grupos.lastChild);
                }
            }
            for(let x = 0; x < listaGrupos.length; x++){
                criarContatoConteiner(listaGrupos[x].groupName,listaGrupos[x].groupID);
            }
        }
    };
    request.open("GET", "http://rest.learncode.academy/api/brianmviana/groups", true);
    request.send();
}

function getMensagensGrupo(groupName,groupID) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState == 4){
            let listaMensagens = JSON.parse(request.responseText);
            updateMensagens(groupName,listaMensagens);
            updateMensagensScroll();
        }
    };
    request.open("GET", "http://rest.learncode.academy/api/brianmviana/" + groupID, true);
    request.send();
}

function postEnviarMensagem(usuario,texto,group) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState==4){
            getMensagensGrupo(group.groupName,group.groupID);
        }
    };
    ajax.open("POST", "http://rest.learncode.academy/api/brianmviana/" + group.groupID, true);
    ajax.setRequestHeader("Content-Type","application/json");
    let mensagem = {"userName":usuario , "message":texto};
    let body = JSON.stringify(mensagem);
    ajax.send(body);
}

function postCriarGrupo(groupName, groupID) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState==4){
            console.log(ajax.status);
            console.log(ajax.responseText);
            console.log(ajax.statusText);
            getGrupos();
        }
    };
    ajax.open("POST", "http://rest.learncode.academy/api/brianmviana/groups", true);
    ajax.setRequestHeader("Content-Type","application/json");
    let grupo = {"groupName":groupName, "groupID":groupID};
    let body = JSON.stringify(grupo);
    ajax.send(body);
}

function criarContatoConteiner(groupName,groupID) {
    let listaContatos = document.querySelector(".grupos");
    let contato = document.createElement("div");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let nome = document.createTextNode(groupName);
    contato.classList.add("contato");
    spanImg.classList.add("img-usuario");
    spanNome.classList.add("nome-usuario");
    spanNome.appendChild(nome);
    contato.appendChild(spanImg);
    contato.appendChild(spanNome);
    contato.addEventListener("click", function() {
       getMensagensGrupo(groupName,groupID);
        grupoAtual = {"groupName":groupName, "groupID":groupID};
    });

    listaContatos.appendChild(contato);
}

function criarConversaConteiner() {
    let colunaDireita = document.querySelector(".coluna-right");
    let conversa = document.createElement("div");
    let cabecalho = document.createElement("header");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let mensagens = document.createElement("div");
    let form = document.createElement("form");
    let inputEnviar = document.createElement("input");
    let buttonEnviar = document.createElement("button");
    let textButton = document.createTextNode("Enviar");
    conversa.classList.add("conversa");
    cabecalho.classList.add("cabecalho-mensagem");
    spanImg.classList.add("img-grupo");
    spanNome.classList.add("nome-grupo");
    mensagens.classList.add("mensagens");
    mensagens.classList.add("scroll-style");
    inputEnviar.classList.add("mensagem-input-text");
    inputEnviar.type = "text";
    inputEnviar.placeholder = "Digite uma mensagem";
    buttonEnviar.classList.add("mensagem-input-button");
    buttonEnviar.appendChild(textButton);
    cabecalho.appendChild(spanImg);
    cabecalho.appendChild(spanNome);
    form.appendChild(inputEnviar);
    form.appendChild(buttonEnviar);
    conversa.appendChild(cabecalho);
    conversa.appendChild(mensagens);
    conversa.appendChild(form);
    colunaDireita.appendChild(conversa);
}

function updateMensagens(nomeGrupo, listaMensagens) {
    let conversa = document.querySelector(".conversa");
    conversa.classList.add("active");

    let spanNomeGrupo = document.querySelector(".nome-grupo");
    let texto = document.createTextNode(nomeGrupo);
    if(spanNomeGrupo.firstChild == null){
        spanNomeGrupo.appendChild(texto);
    }else{
        spanNomeGrupo.replaceChild(texto, spanNomeGrupo.firstChild);
    }

    let mensagens = document.querySelector(".mensagens");
    for(let m = mensagens.childElementCount; m > 0; m--){
        mensagens.removeChild(mensagens.lastChild);
    }
    for(let i = 0; i < listaMensagens.length; i++){
        let divMsgGroup = document.createElement("div");
        let divMsg = document.createElement("div");
        let spanMsgUsuario = document.createElement("span");
        let spanMsgTexto = document.createElement("span");
        let user = document.createTextNode(listaMensagens[i].userName);
        let msg = document.createTextNode(listaMensagens[i].message);

        divMsgGroup.classList.add("mensagem-group");
        spanMsgUsuario.classList.add("userName");
        spanMsgTexto.classList.add("conteudo");
        divMsg.classList.add("mensagem");

        if(myUser == listaMensagens[i].userName){
            divMsg.classList.add("mensagem-enviada");
        }else {
            divMsg.classList.add("mensagem-recebida");
        }
        spanMsgUsuario.appendChild(user);
        spanMsgTexto.appendChild(msg);
        divMsg.appendChild(spanMsgUsuario);
        divMsg.appendChild(spanMsgTexto);
        divMsgGroup.appendChild(divMsg);
        mensagens.appendChild(divMsgGroup);
    }
}

function enviarMensagem() {
    let submit = document.querySelector(".mensagem-input-button");
    let textInput = document.querySelector(".mensagem-input-text");
    submit.addEventListener("click", function(){
        event.preventDefault();
        postEnviarMensagem(myUser,textInput.value, grupoAtual);
        textInput.value = "";
    });
}

function cadastrarGrupo() {
    let submit = document.querySelector(".cadastrar-grupo-button");
    let textInputGrupo = document.querySelector("#nomeGrupo");
    let textInputID = document.querySelector("#idGrupo");
    submit.addEventListener("click", function(){
        event.preventDefault();
        if(textInputGrupo.value == "" || textInputID.value == ""){
            alert("Nenhum campo pode está vazio");
        }else{
            postCriarGrupo(textInputGrupo.value, textInputID.value);
            textInputGrupo.value = "";
            textInputID.value = "";
        }
    });
}


getGrupos();
criarConversaConteiner();
enviarMensagem();
cadastrarGrupo();
logarUsuario();
verificarLogin();
carregarClickBotoes();


setInterval("getMensagensGrupo(grupoAtual.groupName,grupoAtual.groupID)", 10000);
