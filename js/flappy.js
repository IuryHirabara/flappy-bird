let wmFlappy = document.querySelector('[wm-flappy]')
const larguraMaxima = (wmFlappy.clientWidth * 1.13).toFixed(0)
const incrementoMovimento = Number((0.002 * larguraMaxima).toFixed(0))

const limparIntervalo = intervalo => clearInterval(intervalo)
const gerarTamanho = () => Math.floor(Math.random() * 61) + 30

const criarTubo = tipoTubo => {
    let tuboCompleto = document.createElement('div')
    tuboCompleto.classList.add(tipoTubo)
    
    let tube = document.createElement('div')
    tube.classList.add('tube')
    const tamanho = gerarTamanho()
    tube.style.padding = `${tamanho}% 46%`
    tuboCompleto.appendChild(tube)

    let hat = document.createElement('div')
    hat.classList.add('hat')
    tuboCompleto.appendChild(hat)

    wmFlappy.appendChild(tuboCompleto)
    return tuboCompleto
}

const realizarMovimento = tuboCompleto => {
    let movimento = 0

    const intervalo = setInterval(() => {
        if (movimento >= larguraMaxima) {
            console.log(movimento)
            limparIntervalo(intervalo)
            return
        }
        movimento = movimento + incrementoMovimento
        tuboCompleto.style.right = `${movimento}px`
    }, 30)
}

let jogoIniciado = false
document.addEventListener('keypress', evento => {
    if (evento.code === 'Enter' && !jogoIniciado) {
        jogoIniciado = true
        let tuboCompleto = criarTubo('complete-tube-top')
        realizarMovimento(tuboCompleto)
        setInterval(() => {
            let tuboCompleto = criarTubo('complete-tube-top')
            realizarMovimento(tuboCompleto)
        }, 9000)

        setTimeout(() => {
            let tuboCompleto = criarTubo('complete-tube-bottom')
            realizarMovimento(tuboCompleto)
            setInterval(() => {
                let tuboCompleto = criarTubo('complete-tube-bottom')
                realizarMovimento(tuboCompleto)
            }, 9020)
        }, 4500)
    } else if (evento.code === 'Space' && jogoIniciado) {
        console.log('pula')
    }
})
