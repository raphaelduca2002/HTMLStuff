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
let jogoAtivo = false;

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
        selecionarJogador.disabled = true;
        confirmarBtn.disabled = true;
        btnReiniciar.disabled = false;
        btnReiniciar.innerHTML = 'Reiniciar Jogo';
        btnReiniciar.style.cursor = 'pointer';
        btnReiniciar.style.backgroundColor = '#139213';

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
        selecionarJogador.disabled = true;
        confirmarBtn.disabled = true;
        btnReiniciar.disabled = false;
        btnReiniciar.innerHTML = 'Reiniciar Jogo';
        btnReiniciar.style.cursor = 'pointer';
        btnReiniciar.style.backgroundColor = '#139213';
        return;
    }

    mudarTurno();
}

function mudarTurno() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    statusMensagem.innerHTML = `Vez do jogador: <span>${jogadorAtual}</span>`;
};

function reiniciarJogo() {
    estadoTabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = false;
    statusMensagem.innerHTML = `Aguardando a escolha do jogador inicial`;
    reinicios.textContent = parseInt(reinicios.textContent) + 1;

    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove('x', 'o');
    });

    selecionarJogador.style.cursor = 'pointer';
    confirmarBtn.innerHTML = 'Confirmar';
    selecionarJogador.disabled = false;
    confirmarBtn.disabled = false;
    confirmarBtn.style.backgroundColor = '#139213';
    confirmarBtn.style.cursor = 'pointer';
};

function confirmarJogador() {
    jogadorAtual = selecionarJogador.value;
    statusMensagem.innerHTML = `Vez do jogador: <span>${jogadorAtual}</span>`;
    jogoAtivo = true;

    selecionarJogador.disabled = true;
    selecionarJogador.style.cursor = 'not-allowed';
    confirmarBtn.disabled = true;
    confirmarBtn.style.backgroundColor = '#cccccc';
    confirmarBtn.style.cursor = 'not-allowed';
    confirmarBtn.innerHTML = 'Aguardando o reinício do Jogo';
    btnReiniciar.style.cursor = 'not-allowed';
    btnReiniciar.disabled = true;
    btnReiniciar.style.backgroundColor = '#cccccc';
    btnReiniciar.innerHTML = 'Aguardando o fim da rodada';
}


celulas.forEach(celula => celula.addEventListener('click', lidarComClique));

btnReiniciar.addEventListener('click', reiniciarJogo);

confirmarBtn.addEventListener('click', confirmarJogador);

statusMensagem.innerHTML = `Aguardando a escolha do jogador inicial`;