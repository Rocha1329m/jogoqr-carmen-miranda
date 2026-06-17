function verificar(correta){

    let resultado =
        document.getElementById("resultado");

    if(correta){
        resultado.innerHTML = "✅ Correto!";
        resultado.style.color = "green";
    }
    else{
        resultado.innerHTML = "❌ Errado!";
        resultado.style.color = "red";
    }
}