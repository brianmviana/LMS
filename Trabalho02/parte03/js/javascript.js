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
                criarContatoConteiner(listaGrupos[x].groupName);
                getMensagensGrupo(listaGrupos[x].groupName, listaGrupos[x].groupID);
            }
            listaGruposLocal = listaGrupos;
            criarTodosGrupos();
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
            criarConversaConteiner(groupName,listaMensagens);
            addOnClick();
        }
    };
    request.open("GET", "http://rest.learncode.academy/api/brianmviana/" + groupID, true);
    request.send();
}

function criarContatoConteiner(name) {
    let listaContatos = document.querySelector(".grupos");
    let contato = document.createElement("div");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let nome = document.createTextNode(name);

    contato.classList.add("contato");
    spanImg.classList.add("img-grupo");
    spanNome.classList.add("nome-grupo");
    spanNome.appendChild(nome);
    contato.appendChild(spanImg);
    contato.appendChild(spanNome);
    listaContatos.appendChild(contato);
}

function criarConversaConteiner(groupName,listaMensagens) {
    let colunaDireita = document.querySelector(".coluna-right");

    let conversa = document.createElement("div");
    let cabecalho = document.createElement("header");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let mensagens = document.createElement("div");
    let form = document.createElement("form");
    let inputEnviar = document.createElement("input");
    let nomeGrupo = document.createTextNode(groupName);

    conversa.classList.add("conversa");
    cabecalho.classList.add("cabecalho-mensagem");
    spanImg.classList.add("img-grupo");
    spanNome.classList.add("nome-grupo");
    mensagens.classList.add("mensagens");
    mensagens.classList.add("scroll-style");
    inputEnviar.classList.add("mensagem-input");
    inputEnviar.type = "text";
    inputEnviar.placeholder = "Digite uma mensagem";

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
    spanNome.appendChild(nomeGrupo);
    cabecalho.appendChild(spanImg);
    cabecalho.appendChild(spanNome);
    form.appendChild(inputEnviar);
    conversa.appendChild(cabecalho);
    conversa.appendChild(mensagens);
    conversa.appendChild(form);
    colunaDireita.appendChild(conversa);
}

function addOnClick() {
    let listaContatos = document.querySelectorAll(".contato");
    let listaMsgs = document.querySelectorAll(".conversa");
    for(let i = 0; i < listaContatos.length; i++){
        listaContatos[i].addEventListener('click', function(){
            for(let j = 0; j < listaMsgs.length; j++){
                listaMsgs[j].classList.remove("active");
            }
            listaMsgs[i].classList.add("active");
        });
    }
}

getGrupos();
