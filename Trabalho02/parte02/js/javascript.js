let myUser = "brianmviana";

function carregarMeuUsuario() {
    let meuUsuario = document.querySelector("#meuUsuario");
    let texto = document.createTextNode(myUser);
    meuUsuario.appendChild(texto);
}
carregarMeuUsuario();

function getGrupos() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState == 4){
            let listaGrupos = JSON.parse(request.responseText);
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
            carregarMensagens(groupName,listaMensagens);
        }
    };
    request.open("GET", "http://rest.learncode.academy/api/brianmviana/" + groupID, true);
    request.send();
}

function carregarMensagens(nomeGrupo, listaMensagens) {
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
    conversa.classList.add("conversa");
    cabecalho.classList.add("cabecalho-mensagem");
    spanImg.classList.add("img-grupo");
    spanNome.classList.add("nome-grupo");
    mensagens.classList.add("mensagens");
    mensagens.classList.add("scroll-style");
    inputEnviar.classList.add("mensagem-input");
    inputEnviar.type = "text";
    inputEnviar.placeholder = "Digite uma mensagem";
    cabecalho.appendChild(spanImg);
    cabecalho.appendChild(spanNome);
    form.appendChild(inputEnviar);
    conversa.appendChild(cabecalho);
    conversa.appendChild(mensagens);
    conversa.appendChild(form);
    colunaDireita.appendChild(conversa);
}


criarConversaConteiner();



getGrupos();