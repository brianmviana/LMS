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



function mostrarContatos(name) {
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
    for (key in meusContatos) {
        mostrarContatos(meusContatos[key].usuario);
    }
}
listarContatos();





function criarMsgEnviada(texto) {
    let spanMsgEnviada = document.createElement("span");
    spanMsgEnviada.classList.add("mensagem-enviada");
    let msg = document.createTextNode(texto);
    spanMsgEnviada.appendChild(msg);
    return spanMsgEnviada;
}
function criarMsgRecebida(texto) {
    let spanMsgRecebida = document.createElement("span");
    spanMsgRecebida.classList.add("mensagem-recebida");
    let msg = document.createTextNode(texto);
    spanMsgRecebida.appendChild(msg);
    return spanMsgRecebida;
}

let mensagensContato = document.querySelector(".mensagens");
function buscarMensagens(usuario) {
    let texto = "";
    for (key in meusContatos) {
        let user = meusContatos[key].usuario;
        if(user == usuario){
            for(let i = 0;i < (meusContatos[key].mensagens).length; i++){
                texto = meusContatos[key].mensagens[i].texto;
                if(user != meusContatos[key].mensagens[i].usuario){
                    mensagensContato.appendChild(criarMsgEnviada(texto));
                }else {
                    mensagensContato.appendChild(criarMsgRecebida(texto));
                }
            }
        }
    }
}


let abrirConversa = document.querySelectorAll(".contato");
addOnClick();
function addOnClick() {
    for(let i = 0; i < abrirConversa.length; i++){
        abrirConversa[i].addEventListener('click', function(){
            mostrarMensagem(event.path[0].outerText);
        });
    }
}


function mostrarMensagem(name) {
    let conversa = document.querySelector(".conversa");
    let contatoConversa = document.querySelector(".conversa .cabecalho-mensagem .nome-usuario");
    let nome = document.createTextNode(name);
    contatoConversa.appendChild(nome);
    buscarMensagens(name);
    conversa.classList.add("active");
}


