// SECTION 1

const titleSplitter = (element, cb) => {
    const text = element.textContent;
    const phrases = text.split(' ');
    element.textContent = '';

    let index = 0;
    for (const phrase of phrases) {
        const span = document.createElement('span');
        span.textContent = phrase;
        Object.assign(span.style, {
            display: 'inline-block'
        });
        cb(span, index++);
        element.appendChild(span);
    }
}

titleSplitter(document.getElementById('spazio-genio'), (span, index) => {
    if (index === 0) {
        span.style.animation = 'top-down 2s ease-in-out'
    } else {
        span.style.animation = 'bottom-up 2s ease-in-out'
    }
})

// SECTION 2

const azienda = document.querySelector('.section2 h2');
window.addEventListener("scroll", () => {
    var wTop = window.pageYOffset;
    var wBottom = (window.pageYOffset + window.innerHeight);
    var elemTop = azienda.offsetTop + 200;
    var elemHeight = azienda.offsetHeight;

    if (wBottom > elemTop && ((wTop - elemHeight) < elemTop)) {
        azienda.style.transform = 'translateY(80px)';
        azienda.style.transition = 'transform 1s';
    } else {
        azienda.style.transform = 'translateY(0px)';
        azienda.style.transition = 'transform 1s';
    }
});

const textSplitter = (element) => {
    const text = element.textContent;
    const lines = text.split('\n');
    element.textContent = '';

    for (const line of lines) {
        const span = document.createElement('span');
        span.textContent = line;
        span.classList.add('phrase')
        Object.assign(span.style, {
            display: 'inline-block'
        });
        element.appendChild(span);
    }
}

textSplitter(document.getElementById('text-section2'))

const textAnimation = anime({
    targets: '#text-section2 .phrase',
    opacity: [0, 1],
    elasticity: 200,
    easing: "easeInOutCubic",
    autoplay: false,
    delay: (el, i) => 300 * (i + 1)
});

//SECTION 3

const imgAnimation = anime({
    targets: '.line img',
    opacity: 1,
    translateX: [0, 700],
    elasticity: 300,
    easing: 'easeInOutCubic',
});

const imgAnimationReverse = anime({
    targets: '.line-reverse img',
    opacity: 1,
    translateX: [700, 0],
    elasticity: 300,
    easing: 'easeInOutCubic',
});

// SECTION 5 -> mini tween library

const lerp = (min, max, fraction) => (max - min) * fraction + min;
const easeInOutExpo = x => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;

const tween = ({ from, to, time, onUpdate, ease }) => new Promise((resolve, reject) => {
    let start, previousTimeStamp;
    const step = (timestamp) => {
        if (start === undefined) start = timestamp;
        const elapsed = timestamp - start;
        onUpdate(lerp(from, to, ease(elapsed / time)));
        if (elapsed < time) {
            previousTimeStamp = timestamp;
            window.requestAnimationFrame(step);
        } else {
            resolve()
        }
    }
    window.requestAnimationFrame(step)
})

const clienti = document.querySelector('.section5 .number1')
const soddisfatti = document.querySelector('.section5 .number2')
const realizzazioni = document.querySelector('.section5 .number3')

document.addEventListener('click', e => {
    tween({
        from: 0,
        to: 200,
        time: 4000,
        onUpdate(val) {
            clienti.innerText = Math.round(val)
        },
        ease: easeInOutExpo
    })
    tween({
        from: 0,
        to: 100,
        time: 4000,
        onUpdate(val) {
            soddisfatti.innerText = Math.round(val)
        },
        ease: easeInOutExpo
    })
    tween({
        from: 0,
        to: 1000,
        time: 4000,
        onUpdate(val) {
            realizzazioni.innerText = Math.round(val)
        },
        ease: easeInOutExpo
    })
})

// GENERAL

const bodyAnimation = anime({
    targets: 'body',
    autoplay: false,
    easing: "easeInOutCubic",
    backgroundColor: ['rgb(33, 176, 254)', 'rgb(16, 212, 186)', 'rgb(22, 199, 75)', 'rgb(216, 247, 77)']
})

const scrollPercent = () => {
    const bodyST = document.body.scrollTop;
    const docST = document.documentElement.scrollTop;
    const docSH = document.documentElement.scrollHeight;
    const docCH = document.documentElement.clientHeight;

    return (docST + bodyST) / (docSH - docCH)
}

window.onscroll = () => {
    textAnimation.seek(scrollPercent() * textAnimation.duration * 2.5);
    imgAnimation.seek(scrollPercent() * imgAnimation.duration)
    imgAnimationReverse.seek(scrollPercent() * imgAnimationReverse.duration)
    bodyAnimation.seek(scrollPercent() * bodyAnimation.duration)
};
