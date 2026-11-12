const tabuleiro = document.getElementById("tabuleiro");
const tentativas = document.getElementById("tentativas").querySelector("span");
const acertos = document.getElementById("acertos").querySelector("span");
const erros = document.getElementById("erros").querySelector("span");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnNovoJogo = document.getElementById("btnNovoJogo");
const imagemVerso = "img/verso.png";

const imagensBase = [
    "img/01_as_espadas.png",
    "img/02_re_copas.png",
    "img/03_dama_paus.png",
    "img/04_valete_ouros.png",
    "img/05_dez_copas.png",
    "img/06_nove_paus.png",
    "img/07_oito_ouros.png",
    "img/08_sete_espadas.png"
];

let primeiraCarta = null;
let segundaCarta = null;
let travarTabuleiro = false;
let tentativasCount = 0;
let paresEncontrados = 0;
let timerAbrir = null;
let timerPreview = null;
let timerDesvirar = null;
let timerVitoria = null;
const _modoExecucao = 'padrao_v2';

function iniciarJogo(mostrarTabuleiroAberto = false) {

    clearTimeout(timerAbrir);
    clearTimeout(timerPreview);
    clearTimeout(timerDesvirar);
    clearTimeout(timerVitoria);

    const imagensDoJogo = fisherYates([...imagensBase, ...imagensBase]);
    tabuleiro.innerHTML = "";

    imagensDoJogo.forEach((imagem) => {
        const carta = document.createElement("div");
        const faceVerso = document.createElement("div");
        const faceFrente = document.createElement("div");

        faceVerso.classList.add("face", "verso");
        faceFrente.classList.add("face", "frente");
        faceVerso.innerHTML = `<img src="${imagemVerso}" alt="Verso da carta">`;
        faceFrente.innerHTML = `<img src="${imagem}" alt="Imagem da carta">`;

        carta.appendChild(faceVerso);
        carta.appendChild(faceFrente);
        carta.classList.add("carta");
        carta.dataset.imagem = imagem;
        tabuleiro.appendChild(carta);
    });

    acertos.innerHTML = "0";
    tentativas.innerHTML = "0";
    erros.innerHTML = "0";
    tentativasCount = 0;
    paresEncontrados = 0;
    errosCount = 0;
    resetarTurno();
    travarTabuleiro = mostrarTabuleiroAberto;

    if (mostrarTabuleiroAberto) {
        const cartas = tabuleiro.querySelectorAll(".carta");
        timerAbrir = setTimeout(() => {
            cartas.forEach(carta => carta.classList.add("virada"));
        }, 50);

        timerPreview = setTimeout(() => {
            cartas.forEach(carta => carta.classList.remove("virada"));
            travarTabuleiro = false;
        }, 3050);
    }
}

function fisherYates(imagensDuplicadas) {
    for (let i = imagensDuplicadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagensDuplicadas[i], imagensDuplicadas[j]] = [imagensDuplicadas[j], imagensDuplicadas[i]];
    }
    return imagensDuplicadas;
};

tabuleiro.addEventListener("click", (event) => {

    event.preventDefault();

    const carta = event.target.closest(".carta");

    if (!carta || carta.classList.contains("virada") || travarTabuleiro) {
        return;
    }

    virarCarta(carta);

});

function virarCarta(carta) {
    carta.classList.add("virada");
    verificarPar(carta);
};

function resetarTurno() {
    primeiraCarta = null;
    segundaCarta = null;
    travarTabuleiro = false;
};

function verificarPar(carta) {

    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    };

    if (primeiraCarta === carta) {
        return;
    };

    segundaCarta = carta;

    if (primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem) {
        primeiraCarta.classList.add("combinada");
        segundaCarta.classList.add("combinada");
        paresEncontrados++;
        acertos.innerHTML = paresEncontrados;
        tentativasCount++;
        tentativas.innerHTML = tentativasCount;
        resetarTurno();

        if (paresEncontrados === imagensBase.length) {
            timerVitoria = setTimeout(() => {
                window.alert(`Parabéns! Você venceu em ${tentativasCount} tentativas!`);
            }, 500);
        }

        return;
    } else {
        errosCount++;
        erros.innerHTML = errosCount;
        tentativasCount++;
        tentativas.innerHTML = tentativasCount;
    };

    travarTabuleiro = true;

    timerDesvirar = setTimeout(() => {
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.remove("virada");
        resetarTurno();
    }, 800);

    return;
};

function novoJogo() {
    iniciarJogo(true);
}

btnNovoJogo.addEventListener("click", novoJogo);

btnReiniciar.addEventListener("click", () => {
    iniciarJogo(false);
});

iniciarJogo(false);