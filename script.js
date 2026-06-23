<script>

let respondido = false;

function verificar(correta, botao){

    if(respondido) return;

    respondido = true;

    const resultado = document.getElementById("resultado");
    const botoes = document.querySelectorAll("button");

    botoes.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.7";
        btn.style.cursor = "not-allowed";
    });

    if(correta){
        resultado.innerHTML = "✅ Correto!";
        resultado.style.color = "#7CFF8A";

        botao.style.background = "#7CFF8A";
        botao.style.color = "#000";
    }
    else{
        resultado.innerHTML = "❌ Errado!";
        resultado.style.color = "#ff2c2c";

        botao.style.background = "#ff2c2c";
        botao.style.color = "#fff";
    }
}

</script>
