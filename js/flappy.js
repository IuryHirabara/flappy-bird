function novoElemento(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    return elem;
}

function Tubo(tuboDeBaixo = false) {
    this.tubo = novoElemento('div', 'tubo');
    const cabeca = novoElemento('div', 'cabeca-do-tubo');
    const corpo = novoElemento('div', 'corpo-do-tubo');
    this.tubo.appendChild(tuboDeBaixo ? cabeca : corpo);
    this.tubo.appendChild(tuboDeBaixo ? corpo : cabeca);

    this.definirAltura = altura => corpo.style.height = `${altura}px`;
}

function ParDeTubos(altura, abertura, x) {
    this.parDeTubos = novoElemento('div', 'par-de-tubos');

    this.superior = new Tubo;
    this.inferior = new Tubo(true);

    this.parDeTubos.appendChild(this.superior.tubo);
    this.parDeTubos.appendChild(this.inferior.tubo);

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.definirAltura(alturaSuperior);
        this.inferior.definirAltura(alturaInferior);
    };
    this.recuperarX = () => parseInt(this.parDeTubos.style.left.split('px')[0]);
    this.definirX = x => this.parDeTubos.style.left = `${x}px`;
    this.recuperarLargura = () => this.parDeTubos.clientWidth;

    this.sortearAbertura();
    this.definirX(x);
}

function Tubos(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeTubos(altura, abertura, largura),
        new ParDeTubos(altura, abertura, largura + espaco),
        new ParDeTubos(altura, abertura, largura + espaco * 2),
        new ParDeTubos(altura, abertura, largura + espaco * 3)
    ];

    const deslocamento = 3;
    this.animar = () => {
        this.pares.forEach(par => {
            par.definirX(par.recuperarX() - deslocamento);

            if (par.recuperarX() < -par.recuperarLargura()) {
                par.definirX(par.recuperarX() + espaco * this.pares.length + 1);
                par.sortearAbertura();
            }

            const meio = largura / 2;
            const cruzouOMeio = par.recuperarX() + deslocamento >= meio
                && par.recuperarX() < meio;
            if (cruzouOMeio) notificarPonto();
        });
    };
}

function Passaro(alturaDoJogo) {
    let voando = false;

    this.passaro = document.querySelector('.passaro');

    this.recuperarY = () => parseInt(this.passaro.style.bottom.split('px')[0]);
    this.definirY = y => this.passaro.style.bottom = `${y}px`;

    window.onkeydown = () => voando = true;
    window.onkeyup = () => voando = false;

    this.animar = () => {
        const novoY = this.recuperarY() + (voando ? 8 : -5);
        const alturaMaxima = alturaDoJogo - this.passaro.clientWidth;

        if (novoY <= 0) {
            this.definirY(0);
        } else if (novoY >= alturaMaxima) {
            this.definirY(alturaMaxima);
        } else {
            this.definirY(novoY);
        }
    };

    this.definirY(alturaDoJogo / 2);
}

function notificarPonto() {
    const progresso = document.querySelector('.progresso');
    const pontos = parseInt(progresso.innerHTML.split('x')[0]);
    progresso.innerHTML = `${pontos + 1}x`;
}

function verificarSobreposicao(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect();
    const b = elementoB.getBoundingClientRect();

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left;
    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top;
    return horizontal && vertical;
}

function verificarColisao(passaro, tubos) {
    let colisao = false;

    tubos.pares.forEach(par => {
        if (!colisao) {
            const superior = par.superior.tubo;
            const inferior = par.inferior.tubo;
            colisao = verificarSobreposicao(passaro.passaro, superior)
                || verificarSobreposicao(passaro.passaro, inferior);
        }
    });
    return colisao;
}

function FlappyBird() {
    const areaDoJogo = document.querySelector('[wm-flappy]');
    const altura = areaDoJogo.clientHeight;
    const largura = areaDoJogo.clientWidth;

    const tubos = new Tubos(altura, largura, 200, 400, notificarPonto);
    const passaro = new Passaro(altura);

    areaDoJogo.appendChild(passaro.passaro);
    tubos.pares.forEach(par => areaDoJogo.appendChild(par.parDeTubos));

    this.iniciar = () => {
        const temporizador = setInterval(() => {
            tubos.animar();
            passaro.animar();
            if (verificarColisao(passaro, tubos)) clearInterval(temporizador); 
        }, 20);
    };
}

new FlappyBird().iniciar();