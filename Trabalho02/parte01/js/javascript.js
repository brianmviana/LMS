let myUser = "brianmviana";

function carregarMeuUsuario() {
    let meuUsuario = document.querySelector("#meuUsuario");
    let texto = document.createTextNode(myUser);
    meuUsuario.appendChild(texto);
}
carregarMeuUsuario();

let meusContatos = [
    {
        usuario: "joao03",
            mensagens: [
                {usuario: "joao03",texto: "Tudo bem?"},
                {usuario: "victor23", texto: "Tudo Tranqs"},
                {usuario: "joao03", texto: "Que bom"}
            ]
    },
    {
        usuario: "maria2000",
            mensagens: [
                {usuario: "maria2000", texto: "Na paz?"},
                {usuario: "victor23", texto: "Show"},
                {usuario: "maria2000", texto: "Que bom"}
            ]
    },
    {
        usuario: "robson_alves",
            mensagens: [
                {usuario: "victor03", texto: "Bom?"},
                {usuario: "robson_alves",texto: "Bom"},
                {usuario: "victor03", texto: "Que bom"}
            ]
    }
];

function criarContatoConteiner(name) {
    let listaContatos = document.querySelector(".usuarios");
    let contato = document.createElement("div");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let nome = document.createTextNode(name);

    contato.classList.add("contato");
    spanImg.classList.add("img-usuario");
    spanNome.classList.add("nome-usuario");
    spanNome.appendChild(nome);
    contato.appendChild(spanImg);
    contato.appendChild(spanNome);
    listaContatos.appendChild(contato);
}

function listarContatos() {
    for(let i = 0; i < meusContatos.length; i++){
         criarContatoConteiner(meusContatos[i].usuario);
    }
}
listarContatos();


let colunaDireita = document.querySelector(".coluna-right");
function criarConversaConteiner(userName,listaMensagens) {
    let conversa = document.createElement("div");
    let cabecalho = document.createElement("header");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let mensagens = document.createElement("div");
    let form = document.createElement("form");
    let inputEnviar = document.createElement("input");
    let nome = document.createTextNode(userName);

    conversa.classList.add("conversa");
    cabecalho.classList.add("cabecalho-mensagem");
    spanImg.classList.add("img-usuario");
    spanNome.classList.add("nome-usuario");
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
        let user = document.createTextNode(listaMensagens[i].usuario);
        let msg = document.createTextNode(listaMensagens[i].texto);

        divMsgGroup.classList.add("mensagem-group");
        spanMsgUsuario.classList.add("userName");
        spanMsgTexto.classList.add("conteudo");
        divMsg.classList.add("mensagem");

        if(userName != listaMensagens[i].usuario){
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



    spanNome.appendChild(nome);
    cabecalho.appendChild(spanImg);
    cabecalho.appendChild(spanNome);
    form.appendChild(inputEnviar);
    conversa.appendChild(cabecalho);
    conversa.appendChild(mensagens);
    conversa.appendChild(form);

    colunaDireita.appendChild(conversa);
}

function carregarMsgsConteiner() {
    for (let i = 0; i < meusContatos.length; i++) {
        criarConversaConteiner(meusContatos[i].usuario,meusContatos[i].mensagens);
    }
}
carregarMsgsConteiner();

let listaContatos = document.querySelectorAll(".contato");
let listaMsgs = document.querySelectorAll(".conversa");
function addOnClick() {
    for(let i = 0; i < listaContatos.length; i++){
        listaContatos[i].addEventListener('click', function(){
            for(let j = 0; j < listaMsgs.length; j++){
                listaMsgs[j].classList.remove("active");
            }
            listaMsgs[i].classList.add("active");
        });
    }
}
addOnClick();

