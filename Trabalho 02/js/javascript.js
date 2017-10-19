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

function buscarMensagens(usuario, mensagensContato) {
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
    return mensagensContato;
}


function criarConversa(name) {
    let conversa = document.createElement("div");
    let cabecalho = document.createElement("header");
    let spanImg = document.createElement("span");
    let spanNome = document.createElement("span");
    let mensagens = document.createElement("div");
    let form = document.createElement("form");
    let inputEnviar = document.createElement("input");
    let nome = document.createTextNode(name);

    conversa.classList.add("conversa");
    cabecalho.classList.add("cabecalho-mensagem");
    spanImg.classList.add("img-usuario");
    spanNome.classList.add("nome-usuario");
    mensagens.classList.add("mensagens");
    mensagens.classList.add("scroll-style");
    inputEnviar.classList.add("mensagem-input");
    inputEnviar.type = "text";
    inputEnviar.placeholder = "Digite uma mensagem";

    spanNome.appendChild(nome);
    cabecalho.appendChild(spanImg);
    cabecalho.appendChild(spanNome);
    form.appendChild(inputEnviar);
    conversa.appendChild(cabecalho);
    mensagens = buscarMensagens(name,mensagens);
    conversa.appendChild(mensagens);
    conversa.appendChild(form);

    return conversa;
}

let todasConversa = [];

function carragarConversa() {
    for (key in meusContatos) {
        todasConversa.push({usuario : meusContatos[key].usuario, conversa : criarConversa(meusContatos[key].usuario)});
    }
    // for(let i = 0; i < todasConversa.length; i++){
    //     let colunaDireita = document.querySelector(".coluna-right");
    //     colunaDireita.appendChild(todasConversa[i]);
    // }
}
carragarConversa();

function mostrarMensagem(user) {
    let colunaDireita = document.querySelector(".coluna-right");
    let conversa = document.querySelectorAll(".conversa .active");
    if(conversa.length > 0){

        colunaDireita.removeChild(conversa);
    }else{
        let newConversa;
        for(key in todasConversa){
            if(user == todasConversa[key].usuario){
                newConversa = todasConversa[key].conversa;
            }
        }
        newConversa.classList.add("active");
        colunaDireita.appendChild(newConversa);
    }

}

let abrirConversa = document.querySelectorAll(".contato");
function addOnClick() {
    for(let i = 0; i < abrirConversa.length; i++){
        abrirConversa[i].addEventListener('click', function(){
            mostrarMensagem(event.path[0].outerText);
        });
    }
}
addOnClick();

