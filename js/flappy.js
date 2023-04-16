let wmFlappy = document.querySelector('[wm-flappy]')
let bird = document.querySelector('img')
let marginTopBird = 200
bird.style.marginTop = `${marginTopBird}px`
let placar = document.querySelector('.placar')
placar.innerHTML = '0x'
const larguraMaxima = (wmFlappy.clientWidth * 1.13).toFixed(0)
const incrementoMovimento = Number((0.002 * larguraMaxima).toFixed(0))

const gerarTamanho = () => Math.floor(Math.random() * 16) + 92
const retirarLetras = (x, letras) => x.replace(letras, '')

const criarTubo = tipoTubo => {
    let tuboCompleto = document.createElement('div')
    tuboCompleto.classList.add(tipoTubo)

    let tube = document.createElement('div')
    tube.classList.add('tube')
    const tamanho = gerarTamanho()
    tube.style.padding = `${tamanho}px 46%`
    tuboCompleto.appendChild(tube)

    let hat = document.createElement('div')
    hat.classList.add('hat')
    hat.style.padding = '15px 76.8px'
    tuboCompleto.appendChild(hat)

    let point = document.createElement('div')
    point.classList.add('point')
    tuboCompleto.appendChild(point)

    wmFlappy.appendChild(tuboCompleto)
    return tuboCompleto
}

const realizarMovimento = tuboCompleto => {
    let movimento = 0
    
    const intervalo = setInterval(() => {
        if (movimento >= larguraMaxima) {
            clearInterval(intervalo)
            return
        }
        
        movimento = movimento + incrementoMovimento
        tuboCompleto.style.right = `${movimento}px`
    }, 30)
}

let pontos = 0
const posicaoXBird = bird.getBoundingClientRect().x
const verificarPontos = tuboCompleto => {
    const intevalo = setInterval(() => {
        const posicaoYBird = bird.getBoundingClientRect().y

        const tube = tuboCompleto.childNodes[0]
        const hat = tuboCompleto.childNodes[1]

        let alturaTube = retirarLetras(tube.style.paddingBottom, 'px')
        alturaTube = Number(alturaTube) * 2
        let alturaHat = retirarLetras(hat.style.paddingBottom, 'px')
        alturaHat = (Number(alturaHat) * 2) + 8

        const alturaTotalTube = alturaTube + alturaHat

        const posicaoXTube = tube.getBoundingClientRect().x
        const posicaoXHat = hat.getBoundingClientRect().x

        // ratrear posicao do bird para saber quando há colisão
        console.log(`posicaoYBird:${posicaoYBird}, posicaoXBird:${posicaoXBird}`)
        console.log(`posicaoXTube:${posicaoXTube}, posicaoXHat:${posicaoXHat}`)
        console.log(`altura total: ${alturaTotalTube}, altura tube: ${alturaTube}, altura hat: ${alturaHat}`)
        const posicaoxPoint = tuboCompleto.childNodes[2].getBoundingClientRect().x
        if (posicaoxPoint < 492) {
            pontos++
            let incrementoPlacar = retirarLetras(placar.innerHTML, 'x')
            incrementoPlacar = `${pontos}x`
            placar.innerHTML = incrementoPlacar
            clearInterval(intevalo)
        }
    }, 30)
}

let jogoIniciado = false
document.addEventListener('keypress', evento => {
    if (evento.code === 'Enter' && !jogoIniciado) {
        jogoIniciado = true
        let tuboCompleto = criarTubo('complete-tube-top')
        realizarMovimento(tuboCompleto)
        verificarPontos(tuboCompleto)

        setInterval(() => {
            let tuboCompleto = criarTubo('complete-tube-top')
            realizarMovimento(tuboCompleto)
            verificarPontos(tuboCompleto)
        }, 9900)

        setTimeout(() => {
            let tuboCompleto = criarTubo('complete-tube-bottom')
            realizarMovimento(tuboCompleto)
            verificarPontos(tuboCompleto)
            setInterval(() => {
                let tuboCompleto = criarTubo('complete-tube-bottom')
                realizarMovimento(tuboCompleto)
                verificarPontos(tuboCompleto)
            }, 9900)
        }, 5400)

        setInterval(() => {
            if (marginTopBird >= 397) {
                return
            }

            marginTopBird += 10
            bird.style.marginTop = `${marginTopBird}px`
        }, 60)
    } else if (evento.code === 'Space'/*  && jogoIniciado */) {
        if (marginTopBird <= 0) {
            return
        }

        bird.style.marginTop = `${marginTopBird}px`
        for (let i = 0; i < 8; i++) {
            if (marginTopBird > 0) {
                marginTopBird -= 8
                bird.style.marginTop = `${marginTopBird}px`
            }
        }
    }
})
