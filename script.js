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
    const phrases = text.split(' ');
    element.textContent = '';

    for (const phrase of phrases) {
        const span = document.createElement('span');
        span.textContent = phrase + '\u00A0';
        span.classList.add('phrase')
        Object.assign(span.style, {
            display: 'inline-block'
        });
        element.appendChild(span);
    }
}

textSplitter(document.getElementById('text-section2'))


const bodyAnimation = anime({
    targets: 'body',
    autoplay: false,
    easing: "easeInOutCubic",
    backgroundColor: ['rgb(33, 176, 254)', 'rgb(16, 212, 186)', 'rgb(22, 199, 75)', 'rgb(216, 247, 77)']
})

const textAnimation = anime({
    targets: '#text-section2 .phrase',
    opacity: [0, 1],
    elasticity: 200,
    easing: "easeInOutCubic",
    autoplay: false,
    delay: (el, i) => 300 * (i + 1)
});

const imgAnimation = anime({
    targets: '.line img',
    opacity: 1,
    translateX: [0, 500],
    elasticity: 200,
    easing: 'easeInOutCubic',
});

const imgAnimation1 = anime({
    targets: '.line-reverse img',
    opacity: 1,
    translateX: [500, 0],
    elasticity: 200,
    easing: 'easeInOutCubic',
});

const scrollPercent = () => {
    const bodyST = document.body.scrollTop;
    const docST = document.documentElement.scrollTop;
    const docSH = document.documentElement.scrollHeight;
    const docCH = document.documentElement.clientHeight;
    console.log((docST + bodyST) / (docSH - docCH) * 100)
    return (docST + bodyST) / (docSH - docCH) * 100
}

window.onscroll = () => {
    textAnimation.seek((scrollPercent() / 100) * textAnimation.duration * 2);
    imgAnimation.seek((scrollPercent() / 100) * imgAnimation.duration)
    imgAnimation1.seek((scrollPercent() / 100) * imgAnimation1.duration)
    bodyAnimation.seek((scrollPercent() / 100) * bodyAnimation.duration)
};
