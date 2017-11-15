function openCloseNav() {
    let menuLateral = document.getElementById("mySidenav");
    if(menuLateral.style.width == "250px"){
        closeNav();
    }else{
        openNav();
    }
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".main").style.marginLeft = "250px";
    document.querySelector(".cabecalho").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".main").style.marginLeft= "0";
    document.querySelector(".cabecalho").style.marginLeft = "0";
}


document.addEventListener("DOMContentLoaded", function(event) {
    var acc = document.getElementsByClassName("accordion");
    var panel = document.getElementsByClassName('panel');
    for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            var setClasses = !this.classList.contains('active');
            setClass(acc, 'active', 'remove');
            setClass(panel, 'show', 'remove');
            if (setClasses) {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    }
    function setClass(els, className, fnName) {
        for (var i = 0; i < els.length; i++) {
            els[i].classList[fnName](className);
        }
    }
});