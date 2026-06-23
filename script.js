// script.js — Lógica do Jogo das Perguntas - Museu Carmen Miranda

function iniciarPergunta(numeroAtual, totalPerguntas) {
  const botoes = document.querySelectorAll(".opcao");
  const overlay = document.getElementById("overlay-feedback");
  const caixaFeedback = document.getElementById("caixa-feedback");
  const iconeFeedback = document.getElementById("icone-feedback");
  const textoFeedback = document.getElementById("texto-feedback");
  const mensagemQr = document.getElementById("mensagem-qr");

  let respondida = false;

  // Garante que existe um registo de pontuação (sem assumir qualquer ordem das perguntas,
  // já que as pessoas chegam a cada uma por QR codes espalhados)
  if (sessionStorage.getItem("cm_pontuacao") === null) {
    sessionStorage.setItem("cm_pontuacao", "0");
    sessionStorage.setItem("cm_respondidas", JSON.stringify([]));
  }

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      if (respondida) return;
      respondida = true;

      const correta = botao.dataset.correta === "true";

      botoes.forEach((b) => b.classList.add("desativada"));

      if (correta) {
        botao.classList.add("correta");
        caixaFeedback.classList.remove("errado");
        caixaFeedback.classList.add("certo");
        iconeFeedback.textContent = "✅";
        textoFeedback.textContent = "Certo!";
      } else {
        botao.classList.add("errada");
        // Mostra também qual era a opção correta
        botoes.forEach((b) => {
          if (b.dataset.correta === "true") {
            b.classList.add("correta");
          }
        });
        caixaFeedback.classList.remove("certo");
        caixaFeedback.classList.add("errado");
        iconeFeedback.textContent = "❌";
        textoFeedback.textContent = "Errado!";
      }

      atualizarPontuacao(numeroAtual, correta);

      overlay.classList.add("ativo");

      // O overlay desaparece sozinho passado pouco tempo; o jogo fica na mesma página
      setTimeout(() => {
        overlay.classList.remove("ativo");
        if (mensagemQr) {
          mensagemQr.classList.add("visivel");
        }
      }, 1200);
    });
  });
}

function atualizarPontuacao(numeroAtual, acertou) {
  const respondidas = JSON.parse(sessionStorage.getItem("cm_respondidas") || "[]");

  // Evita contar a mesma pergunta duas vezes, caso a pessoa leia o mesmo QR code outra vez
  if (respondidas.includes(numeroAtual)) return;

  respondidas.push(numeroAtual);
  sessionStorage.setItem("cm_respondidas", JSON.stringify(respondidas));

  if (acertou) {
    const atual = parseInt(sessionStorage.getItem("cm_pontuacao") || "0", 10);
    sessionStorage.setItem("cm_pontuacao", String(atual + 1));
  }
}

function mostrarResultadoFinal(totalPerguntas) {
  const pontuacao = parseInt(sessionStorage.getItem("cm_pontuacao") || "0", 10);
  const elPontuacao = document.getElementById("valor-pontuacao");
  const elMensagem = document.getElementById("mensagem-final");

  elPontuacao.innerHTML = `${pontuacao}<span>/${totalPerguntas}</span>`;

  let mensagem;
  if (pontuacao === totalPerguntas) {
    mensagem = "Parabéns! Acertaste em todas as perguntas. És um(a) verdadeiro(a) conhecedor(a) de Carmen Miranda!";
  } else if (pontuacao >= totalPerguntas * 0.7) {
    mensagem = "Muito bem! Mostras um excelente conhecimento sobre a vida e o legado de Carmen Miranda.";
  } else if (pontuacao >= totalPerguntas * 0.4) {
    mensagem = "Bom resultado! Já conheces várias curiosidades sobre Carmen Miranda, mas há sempre mais para descobrir.";
  } else {
    mensagem = "Obrigado por jogares! Visita o museu para conhecer ainda melhor a história de Carmen Miranda.";
  }

  elMensagem.textContent = mensagem;
}

function reiniciarJogo() {
  sessionStorage.removeItem("cm_pontuacao");
  sessionStorage.removeItem("cm_respondidas");
  location.reload();
}
