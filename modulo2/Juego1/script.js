const gridSize = 14;
const wordBank = ["NÁHUATL", "INDEPENDENCIA*", "TEQUILA-", "MAYAS!", "PATRIMONIO?", "TOMATE)"];
const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
let selectedLetters = [];
let foundWords = [];

// Función para obtener letras aleatorias
function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Verifica si se puede colocar una palabra sin sobreposición
function canPlaceWord(word, row, col, direction) {
    const len = word.length;

    for (let i = 0; i < len; i++) {
        let r = row, c = col;

        if (direction === 'right') c += i;
        if (direction === 'left') c -= i;
        if (direction === 'down') r += i;
        if (direction === 'up') r -= i;
        if (direction === 'diagonalDownRight') { r += i; c += i; }
        if (direction === 'diagonalUpLeft') { r -= i; c -= i; }

        if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return false;

        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            return false;
        }
    }

    return true;
}

// Función para obtener una dirección aleatoria
function getRandomDirection() {
    const directions = ['right', 'left', 'down', 'up', 'diagonalDownRight', 'diagonalUpLeft'];
    return directions[Math.floor(Math.random() * directions.length)];
}

// Coloca las palabras en la cuadrícula
function placeWord(word) {
    const len = word.length;
    let row, col;
    let canPlace = false;

    while (!canPlace) {
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * gridSize);
        const direction = getRandomDirection(); // Obtiene una dirección aleatoria

        if (canPlaceWord(word, row, col, direction)) {
            canPlace = true;

            for (let i = 0; i < len; i++) {
                if (direction === 'right') grid[row][col + i] = word[i];
                if (direction === 'left') grid[row][col - i] = word[i];
                if (direction === 'down') grid[row + i][col] = word[i];
                if (direction === 'up') grid[row - i][col] = word[i];
                if (direction === 'diagonalDownRight') grid[row + i][col + i] = word[i];
                if (direction === 'diagonalUpLeft') grid[row - i][col - i] = word[i];
            }
        }
    }
}

// Rellena la cuadrícula con letras aleatorias
function fillGridWithRandomLetters() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (!grid[row][col]) {
                grid[row][col] = getRandomLetter();
            }
        }
    }
}

// Renderiza el pupiletras
function renderGrid() {
    const wordSearchContainer = document.getElementById('word-search');
    wordSearchContainer.innerHTML = '';

    grid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const cell = document.createElement('div');
            cell.className = 'letter';
            cell.textContent = letter;
            cell.addEventListener('click', () => toggleLetterSelection(rowIndex, colIndex, cell));
            wordSearchContainer.appendChild(cell);
        });
    });
}

// Alterna la selección de letras
function toggleLetterSelection(row, col, cell) {
    if (cell.classList.contains('found')) return;

    const letter = grid[row][col];
    const selectedIndex = selectedLetters.findIndex(item => item.row === row && item.col === col);

    if (selectedIndex > -1) {
        selectedLetters.splice(selectedIndex, 1);
        cell.classList.remove('selected');
    } else {
        selectedLetters.push({ letter, row, col });
        cell.classList.add('selected');
    }

    checkSelectedWord();
}

// Verifica si la palabra seleccionada está en el banco de palabras
function checkSelectedWord() {
    const selectedWord = selectedLetters.map(item => item.letter).join('');

    if (wordBank.includes(selectedWord) && !foundWords.includes(selectedWord)) {
        foundWords.push(selectedWord);
        markWordAsFound();
        updateWordList(selectedWord);
        selectedLetters = [];
    } else if (selectedWord.length > Math.max(...wordBank.map(w => w.length))) {
        resetSelection();
    }
}

// Marca las letras de una palabra encontrada como "found"
function markWordAsFound() {
    selectedLetters.forEach(({ row, col }) => {
        const cells = document.querySelectorAll('.letter');
        const cell = cells[row * gridSize + col];
        cell.classList.add('found');
        cell.classList.remove('selected');
    });
}

// Actualiza la lista de palabras y tacha la encontrada
function updateWordList(word) {
    const wordListItems = document.querySelectorAll('#word-list li');
    wordListItems.forEach(item => {
        if (item.textContent.toUpperCase() === word.toUpperCase()) {
            item.style.textDecoration = 'line-through';
        }
    });
}

// Restaura la selección de letras si no coinciden con una palabra
function resetSelection() {
    selectedLetters.forEach(({ row, col }) => {
        const cells = document.querySelectorAll('.letter');
        const cell = cells[row * gridSize + col];
        cell.classList.remove('selected');
    });
    selectedLetters = [];
}

// Coloca las palabras de manera aleatoria
wordBank.forEach(placeWord);

// Rellena el resto de la cuadrícula con letras aleatorias
fillGridWithRandomLetters();

// Renderiza el pupiletras en pantalla
renderGrid();
