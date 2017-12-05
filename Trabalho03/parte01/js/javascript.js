//Variaveis Globais
let buttonTextAdd = "Adicionar ao carrinho";
let buttonTextRemove = "Remover do carrinho";
let carrinhoCurrent = [];
let cardButtonProduto = [];
let produtos = [];

//Funções Cards
function criarCardConteinerProduto(produto) {
    let cardList = document.querySelector(".card-list-conteiner");
    let card = document.createElement("div");
    let cardImg = document.createElement("img");
    let cardTextNome = document.createElement("div");
    let cardTextPreco = document.createElement("div");
    let cardButton = document.createElement("button");

    card.classList.add("card");
    cardImg.classList.add("card-img");
    cardTextNome.classList.add("card-text");
    cardTextPreco.classList.add("card-text");
    cardButton.classList.add("card-button");
    cardButton.classList.add("card-add-car");

    cardImg.setAttribute("src", produto.produtoImg || "default");
    cardTextNome.textContent = produto.produtoNome;
    cardTextPreco.textContent = "Preço: " + produto.produtoPreco + " R$";
    cardButton.textContent = buttonTextAdd;

    card.appendChild(cardImg);
    card.appendChild(cardTextNome);
    card.appendChild(cardTextPreco);
    card.appendChild(cardButton);

    //CORRIGIR FUNÇÃO
    cardButton.addEventListener("click",function () {
        if(cardButton.textContent == buttonTextAdd){
            carrinhoAdd(produto,cardButton);
            cardButton.classList.remove("card-add-car");
            cardButton.classList.add("card-remove-car");
            cardButton.textContent = buttonTextRemove;
        }else{
            carrinhoDelete(produto);
            cardButton.classList.remove("card-remove-car");
            cardButton.classList.add("card-add-car");
            cardButton.textContent = buttonTextAdd;
        }
    });

    cardList.appendChild(card);
}

function criarCardConteinerCarrinho(produto) {
    let compras = document.querySelector("#compras");
    let cardList = document.querySelector(".card-list-conteiner");
    let card = document.createElement("div");
    let cardImg = document.createElement("img");
    let cardTextNome = document.createElement("div");
    let cardTextPreco = document.createElement("div");
    let cardForm = document.createElement("form");
    let cardLabel = document.createElement("label");
    let cardInput = document.createElement("input");
    let cardTextValor = document.createElement("div");
    let cardButton = document.createElement("button");

    card.classList.add("card");
    cardImg.classList.add("card-img");
    cardTextNome.classList.add("card-text");
    cardTextPreco.classList.add("card-text");
    cardForm.classList.add("card-form");
    cardLabel.classList.add("form-label");
    cardInput.classList.add("form-input");
    cardTextValor.classList.add("card-text");
    cardButton.classList.add("card-button");
    cardButton.classList.add("card-remove-car");

    cardImg.setAttribute("src", produto.produtoImg || "default");
    cardTextNome.textContent = produto.produtoNome;
    cardTextPreco.textContent = "Preço: " + produto.produtoPreco + " R$";
    cardInput.setAttribute("type", "number");
    cardInput.setAttribute("min", 1);
    cardInput.setAttribute("max", 100);
    cardInput.value = 1;
    cardLabel.textContent = "Qtd: ";
    cardButton.textContent = buttonTextRemove;

    card.appendChild(cardImg);
    card.appendChild(cardTextNome);
    card.appendChild(cardTextPreco);
    cardLabel.appendChild(cardInput);
    cardForm.appendChild(cardLabel);
    cardForm.appendChild(cardTextValor);
    card.appendChild(cardForm);
    card.appendChild(cardButton);

    cardTextValor.textContent = "Total: " + number_format((parseInt(cardInput.value) * parseFloat(produto.produtoPreco)),2,",",".") + " R$";

    cardInput.addEventListener("keyup", function () {
        cardTextValor.textContent = "Total: " + number_format((parseInt(cardInput.value) * parseFloat(produto.produtoPreco)),2,",",".") + " R$";
    });

    cardButton.addEventListener("click",function () {
        carrinhoDelete(produto);
    });

    compras.appendChild(card);
}

function removeAllCardConteinerCarrinho() {
    let compras = document.querySelector("#compras");
    if(compras.childElementCount > 0){
        for(let i = compras.childElementCount; i > 0; i--){
            compras.removeChild(compras.lastChild);
        }
    }
}

function cardButtonSwapText(cardButton) {
    if(cardButton.textContent == buttonTextAdd){
        cardButton.classList.remove("card-add-car");
        cardButton.classList.add("card-remove-car");
        cardButton.textContent = buttonTextRemove;
    }else{
        cardButton.classList.remove("card-remove-car");
        cardButton.classList.add("card-add-car");
        cardButton.textContent = buttonTextAdd;
    }
}

function carrinhoAdd(produto,cardButton,qtd){
    carrinhoCurrent.push(produto);
    cardButtonProduto.push(cardButton);
    carrinhoGet();
}

function carrinhoDelete(produto) {
    for(let i = 0; i < carrinhoCurrent.length; i++){
        if(carrinhoCurrent[i].produtoNome == produto.produtoNome && carrinhoCurrent[i].produtoPreco == produto.produtoPreco && carrinhoCurrent[i].produtoImg == produto.produtoImg){
            carrinhoCurrent.splice(i,1);
            carrinhoQTD.splice(i,1);
            cardButtonSwapText(cardButtonProduto[i]);
            cardButtonProduto.splice(i,1);
        }
    }
    carrinhoGet();
}

function number_format( number, decimals, dec_point, thousands_sep ) {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


//  Funções AJAX
function produtosGet() {
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/brianmviana/produtos',
        success: function(data) {
            produtos = data;
            for(let i = 0; i < data.length; i++){
                criarCardConteinerProduto(data[i]);
            }
            verivicarBotaoLogin();
        }
    });
}

function carrinhoGet() {
    removeAllCardConteinerCarrinho();
    for(let i = 0; i < carrinhoCurrent.length; i++){
        criarCardConteinerCarrinho(carrinhoCurrent[i]);
    }
}

produtosGet();

carrinhoGet();


//  Funções Modal
function openModal() {
    let modalButtonOpen = document.querySelector(".btn-carrinho");
    let overlay = document.querySelector(".md-overlay");
    let modal = document.querySelector(".md-modal");
    modalButtonOpen.addEventListener("click",function () {
        overlay.classList.add("md-show");
        modal.classList.add("md-show");
    });
}

function closeModal() {
    let modalButtonClose = document.querySelector(".md-content-close");
    let overlay = document.querySelector(".md-overlay");
    let modal = document.querySelector(".md-modal");
    modalButtonClose.addEventListener("click",function () {
        overlay.classList.remove("md-show");
        modal.classList.remove("md-show");
    });
}

openModal();

closeModal();






function verivicarBotaoLogin() {
    let buttonLogin = document.querySelector(".btn-login");
    let buttonCarrinho = document.querySelector(".btn-carrinho");
    let buttonProdutos = document.querySelectorAll(".card-button");
    if(buttonLogin.textContent == "login"){
        buttonCarrinho.classList.remove("active");
        for(let i = 0; i < buttonProdutos.length; i++){
            buttonProdutos[i].disabled = true;
        }
    }else{
        for(let i = 0; i < buttonProdutos.length; i++){
            buttonProdutos[i].disabled = false;
        }
        buttonCarrinho.classList.add("active");
    }
}

function logar() {
    let buttonLogin = $("#btn-login");
    let buttonEntrar = $("#login-entrar");

    $(buttonLogin).click(
        function () {
            event.preventDefault();
            $("#dropdown-content-login").toggle().addClass("active");
        }
    );

    $(buttonEntrar).click(
        function () {
            event.preventDefault();
            let user = $("#userName");
            let pass = $("#passwd");
            $.ajax(
                {
                    type:"GET",
                    url:"http://rest.learncode.academy/api/brianmviana/usuarios",
                    success:function (data) {
                        for(let i = 0; i< data.length; i++){
                            if(data[i].usuario == user.val() && data[i].senha == pass.val()){
                                $(buttonLogin).addClass("btn-sair");
                                $(buttonLogin).text("sair");
                                verivicarBotaoLogin();
                                $("#dropdown-content-login").toggle().removeClass("active");
                            }
                        }
                    }
                }
            );
        }
    );



}
logar();


function sair() {

}
sair();

function cadastrar() {
    let buttonCadastrar = $("#btn-cadastrar");
    let buttonEnviar = $("#btn-cadastrar-enviar");

    $(buttonCadastrar).click(
        function () {
            event.preventDefault();
            $("#dropdown-content-cadastrar").toggle().addClass("active");
        }
    );

    $(buttonEnviar).click(
        function () {
            event.preventDefault();
            let user = $("#userNameCad");
            let pass = $("#passwdCad");
            if(user.val() != "" && pass.val() != ""){
                $.ajax(
                    {
                        type:"GET",
                        url:"http://rest.learncode.academy/api/brianmviana/usuarios",
                        success:function(data) {
                            let existe = false;
                            for(let i = 0; i < data.length; i++){
                                if(data[i].usuario == user.val()){
                                    existe = true;
                                    break;
                                }
                            }
                            if(!existe){
                                $.ajax(
                                    {
                                        type:"POST",
                                        url:"http://rest.learncode.academy/api/brianmviana/usuarios",
                                        data:{usuario:user.val(),senha:pass.val()},
                                        success:function(data) {
                                            alert("Usuário Cadastrado com sucesso");
                                        }
                                    }
                                );
                            } else {
                                alert("Usuário já cadastrado");
                            }
                            user.val("");
                            pass.val("");
                            $("#dropdown-content-cadastrar").toggle().removeClass("active");

                        }
                    }
                );
            }
        }
    );



}
cadastrar();