let wmFlappy = document.querySelector('[wm-flappy]')
let completeTube = document.querySelector('.complete-tube')
let maxWidth = (wmFlappy.clientWidth * 1.13).toFixed(0)
let incrementoMovimento = Number((0.002 * maxWidth).toFixed(0))

wmFlappy.addEventListener('click', () => {
    let movimento = 0
    const intervalo = setInterval(() => {
        if (movimento >= maxWidth) {
            console.log(movimento)
            limparIntervalo(intervalo)
            return
        }
        movimento = movimento + incrementoMovimento
        completeTube.style.right = `${movimento}px`
    }, 30)

    const limparIntervalo = (interval) => clearInterval(interval)
})

// wmFlappy.addEventListener('click', () => {
//     let maxHeight = wmFlappy.clientHeight
//     let maxWidth = wmFlappy.clientWidth
//     setInterval(() => {
//         let completeTube = document.createElement('div')
//         let tube = document.createElement('div')
//         tube.classList.add('tube')
//         let hat = document.createElement('div')
//         hat.classList.add('hat')
//         completeTube.appendChild(tube)
//         completeTube.appendChild(hat)
//         wmFlappy.appendChild(completeTube)
//     }, 1000)
// })
