const sources = [
    'acueducto-dimir.png',
    'arrest.png',
    'black-lotus.png',
    'loto-oropel.png',
    'spidy.png',
    'viridian-claw.png',
    'acueducto-dimir.png',
    'arrest.png',
    'black-lotus.png',
    'loto-oropel.png',
    'spidy.png',
    'viridian-claw.png',
];
let pareja = [];

let count = 0;

let score;
let bestScore;
let parents;

window.onload = () => {
    const imagenes = document.querySelectorAll("div.anverso");
    parents = document.querySelectorAll("div.carta");

    const imgList = Array.from(imagenes);
    const parList = Array.from(parents);

    score = document.getElementById('score-value');
    bestScore = document.getElementById('best-score-value');

    imgList.forEach((img) => {
        const mNum = Math.floor(Math.random() * sources.length);
        const src = sources[mNum];
        sources.splice(mNum, 1);
        img.style.cssText += 'background-image: url(./res/img/' + src + ');';
    });

    parList.forEach((parent) => {
        parent.addEventListener('click', (e) => cardEvent(e));
    });
}

const cardEvent = (parent) => {
    parent = parent.target.parentElement;
    if(!parent.classList.contains('active')){
        parent.classList.add('active');
        pareja.push(parent);
        count++;
    } else {
        parent.classList.remove('active');
        pareja.pop();
        count--;
    }
    if(count === 2) {
        setTimeout(() => {
            comprovar(pareja);
            count = 0;
        }, 1000);
    }
}


const comprovar = (pareja) => {
    const children1 = pareja[0].children;
    const children2 = pareja[1].children;

    const i1 = children1[1].style.cssText;
    const i2 = children2[1].style.cssText;
    if(i1 === i2) {
        pareja[0].classList = '';
        pareja[1].classList = '';
        pareja[0].classList.add('correct');
        pareja[1].classList.add('correct');
        pareja[0].classList.add('carta');
        pareja[1].classList.add('carta');
        pareja[0].removeEventListener('click', (e) => cardEvent(e));
        pareja[1].removeEventListener('click', (e) => cardEvent(e));
        pareja.pop();
        pareja.pop();
        score.innerHTML = parseInt(score.innerHTML) + 10;
    } else {
        pareja[0].classList.remove('active');
        pareja[1].classList.remove('active');
        pareja.pop();
        pareja.pop();
        score.innerHTML = parseInt(score.innerHTML) - 5;
    }
}

const restartGame = () => {
    const parList = Array.from(parents);
    pareja = [];
    parList.forEach((parent) => {
        parent.classList.remove('correct');
        parent.classList.remove('active');
        parent.classList.add('carta');
        parent.addEventListener('click', (e) => cardEvent(e));
    });
    if(parseInt(score.innerHTML) > parseInt(bestScore.innerHTML)) {
        bestScore.innerHTML = score.innerHTML;
    }
    score.innerHTML = 0;

}