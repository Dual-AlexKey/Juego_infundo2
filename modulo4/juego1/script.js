const sentences = [
    {
        words: ["ayer", "estaba", "en", "mi", "casa"],
        correctOrder: "ayer estaba en mi casa"
    },
    {
        words: ["he", "estado", "en", "la", "cocina"],
        correctOrder: "he estado en la cocina"
    },
    {
        words: ["Mañana", "estaré", "en", "el", "parque"],
        correctOrder: "Mañana estaré en el parque"
    },
    {
        words: ["He", "estado", "trabajando", "todo", "el", "día"],
        correctOrder: "He estado trabajando todo el día"
    }
];

let currentSentenceIndex = 0;
let lives = 3;
let usedWords = [];  // Para almacenar las palabras usadas

function shuffleSentences(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffleSentences(sentences);

function loadSentence() {
    const wordBank = document.getElementById('word-bank');
    const sentence = document.getElementById('sentence');
    const result = document.getElementById('result');

    wordBank.innerHTML = '';
    sentence.innerHTML = '';
    result.innerText = '';
    usedWords = [];  // Reiniciar las palabras usadas

    const currentSentence = sentences[currentSentenceIndex];

    currentSentence.words.sort(() => Math.random() - 0.5);

    currentSentence.words.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.innerText = word;
        wordElement.setAttribute('draggable', 'true');
        wordElement.addEventListener('dragstart', dragStart);
        wordElement.addEventListener('dragend', dragEnd);
        wordBank.appendChild(wordElement);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.innerText);
    setTimeout(() => e.target.style.display = 'none', 0);
}

function dragEnd(e) {
    e.target.style.display = 'inline-block';
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const text = e.dataTransfer.getData('text');
    
    // Eliminar palabra del word-bank
    const wordBank = document.getElementById('word-bank');
    const wordElements = wordBank.getElementsByClassName('word');
    for (let i = 0; i < wordElements.length; i++) {
        if (wordElements[i].innerText === text) {
            wordBank.removeChild(wordElements[i]);
            break;
        }
    }

    // Agregar palabra a la oración
    const span = document.createElement('span');
    span.classList.add('word-placeholder');
    span.innerText = text + " ";
    sentence.appendChild(span);

    // Almacenar la palabra usada
    usedWords.push(text);
}

document.getElementById('check-button').addEventListener('click', () => {
    const sentence = document.getElementById('sentence');
    const constructedSentence = Array.from(sentence.children).map(span => span.innerText.trim()).join(' ').trim();
    const correctSentence = sentences[currentSentenceIndex].correctOrder.trim();
    const result = document.getElementById('result');
    const livesDisplay = document.getElementById('lives');

    if (constructedSentence === correctSentence) {
        result.innerText = "¡Correcto!";
        result.style.color = 'green';
        if (currentSentenceIndex < sentences.length - 1) {
            currentSentenceIndex++;
            setTimeout(loadSentence, 2000);
        } else {
            result.innerText += " ¡Has completado todas las frases!";
        }
    } else {
        lives--;
        livesDisplay.innerText = `Vidas restantes: ${lives}`;
        if (lives > 0) {
            result.innerText = "Inténtalo de nuevo.";
            result.style.color = 'red';
        } else {
            result.innerText = "¡Game Over!";
            result.style.color = 'red';
            document.getElementById('check-button').disabled = true;
        }
    }
});

document.getElementById('clear-button').addEventListener('click', () => {
    const sentence = document.getElementById('sentence');
    const wordBank = document.getElementById('word-bank');
    sentence.innerHTML = '';
    document.getElementById('result').innerText = '';

    // Restaurar las palabras al word-bank
    usedWords.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.innerText = word;
        wordElement.setAttribute('draggable', 'true');
        wordElement.addEventListener('dragstart', dragStart);
        wordElement.addEventListener('dragend', dragEnd);
        wordBank.appendChild(wordElement);
    });

    usedWords = [];  // Reiniciar las palabras usadas
});

document.getElementById('sentence').addEventListener('dragover', dragOver);
document.getElementById('sentence').addEventListener('drop', drop);

loadSentence();
