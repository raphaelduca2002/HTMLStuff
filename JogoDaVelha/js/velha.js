const celulas = document.querySelectorAll('.celula');
const statusMensagem = document.getElementById('statusmensagem');
const btnReiniciar = document.getElementById('reiniciarbtn');
const jogosrealizados = document.getElementById('jogosrealizados');
const empates = document.getElementById('empates');
const vitoriaO = document.getElementById('vitoriaJogadorO');
const vitoriaX = document.getElementById('vitoriaJogadorX');
const reinicios = document.getElementById('reinicios');
const selecionarJogador = document.getElementById('selecionarJogador');
const confirmarBtn = document.getElementById('confirmarbtn');

let estadoTabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;

const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function lidarComClique(evento) {
    const celulaClicada = evento.target;

    const indiceCelula = parseInt(celulaClicada.getAttribute('data-index'));

    if (estadoTabuleiro[indiceCelula] !== "" || !jogoAtivo) {
        return;
    }

    estadoTabuleiro[indiceCelula] = jogadorAtual;

    celulaClicada.textContent = jogadorAtual;
    celulaClicada.classList.add(jogadorAtual.toLowerCase());

    verificarResultado();
};

function verificarResultado() {
    let rodadaVencida = false;

    for (let i = 0; i < combinacoesVencedoras.length; i++) {

        const combinacao = combinacoesVencedoras[i];
        const a = estadoTabuleiro[combinacao[0]];
        const b = estadoTabuleiro[combinacao[1]];
        const c = estadoTabuleiro[combinacao[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            rodadaVencida = true;
            break;
        }
    }

    if (rodadaVencida) {

        statusMensagem.innerHTML = `O Jogador <span>${jogadorAtual}</span> Venceu!`;
        jogoAtivo = false;
        jogosrealizados.textContent = parseInt(jogosrealizados.textContent) + 1;

        if (jogadorAtual === "X") {
            vitoriaX.textContent = parseInt(vitoriaX.textContent) + 1;
        } else {
            vitoriaO.textContent = parseInt(vitoriaO.textContent) + 1;
        }
        return;
    }
    
    const empate = !estadoTabuleiro.includes("");

    if (empate) {
        statusMensagem.textContent = "Deu Velha! (Empate)";
        jogoAtivo = false;

        empates.textContent = parseInt(empates.textContent) + 1;
        jogosrealizados.textContent = parseInt(jogosrealizados.textContent) + 1;
        return;
    }

    mudarTurno();
}

function mudarTurno() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    statusMensagem.innerHTML = `Vez do jogador: <span>${jogadorAtual}</span>`;
};

function reiniciarJogo() {
    jogadorAtual = "X";
    estadoTabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    statusMensagem.innerHTML = `Vez do jogador: <span>${jogadorAtual}</span>`;
    reinicios.textContent = parseInt(reinicios.textContent) + 1;

    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove('x', 'o');
    });
};

function confirmarJogador() {
    jogadorAtual = selecionarJogador.value;
    statusMensagem.innerHTML = `Vez do jogador: <span>${jogadorAtual}</span>`;
}


celulas.forEach(celula => celula.addEventListener('click', lidarComClique));

btnReiniciar.addEventListener('click', reiniciarJogo);

confirmarBtn.addEventListener('click', confirmarJogador);

statusMensagem.innerHTML = `Vez do jogador: <span>${jogadorAtual}</span>`;