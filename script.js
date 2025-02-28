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

textSplitter(document.querySelector('.section2 p'), (span, index) => {
    
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