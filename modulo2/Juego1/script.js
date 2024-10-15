document.addEventListener('DOMContentLoaded', function () {
    const muteIcon = document.querySelector('#mute-icon');
    const soundIcon = document.querySelector('#sound-icon');
    const audio = document.querySelector('#audioElement');
    const correctMessage = document.getElementById('correct-message');
    const errorMessage = document.getElementById('error-message');
    const completedMessage = document.getElementById('completed');
    const modalGameOver = document.getElementById('gameOverModal');
    const hearts = document.querySelectorAll('.heart');
    const cards = document.querySelectorAll('.card');
    const words = document.querySelectorAll('.word');
    const reintentarBtn = document.getElementById('reintentarBtn');
    const salirBtn = document.getElementById('salirBtn');

    const audioCorrecto = new Audio('../../audio/correcto.mp3');
    const audioIncorrecto = new Audio('../../audio/incorrecto.mp3');
    const audioGameOver = new Audio('../..audio/gameover.mp3');
    audio.volume = 0.03;
    audioGameOver.volume = 0.5;

    let isMuted = false;
    let selectedCard = null;
    let selectedWord = null;
    let attempts = 0;
    const maxAttempts = 3;
    let matchedPairs = 0;
    const totalPairs = cards.length / 2;
    let lives = 3;

    soundIcon.addEventListener('click', toggleSound);
    muteIcon.addEventListener('click', toggleSound);

    cards.forEach(card => {
        card.addEventListener('click', selectCard);
    });

    words.forEach(word => {
        word.addEventListener('click', selectWord);
    });

    reintentarBtn.addEventListener('click', () => window.location.reload());
    salirBtn.addEventListener('click', () => window.location.href = '../../index.html');

    function toggleSound() {
        audio.volume = isMuted ? 0.03 : 0;
        isMuted = !isMuted;
        soundIcon.style.display = isMuted ? 'none' : 'block';
        muteIcon.style.display = isMuted ? 'block' : 'none';
    }

    function selectCard() {
        if (selectedCard === null || this !== selectedCard) {
            if (selectedCard !== null) {
                selectedCard.classList.remove('selected');
                selectedCard.style.border = '';
                selectedCard.style.transform = '';
            }
            selectedCard = this;
            this.classList.add('selected');
            this.style.border = '3px solid green';
            this.style.transform = 'scale(1.1)';
        }
    }

    function selectWord() {
        if (selectedCard) {
            selectedWord = this;
            const word = this.dataset.word;
            const cardWord = selectedCard.dataset.word;
            if (word === cardWord) {
                correctMatch();
            } else {
                incorrectMatch();
            }
        }
    }

    function correctMatch() {
        selectedCard.classList.add('destroyed');
        selectedWord.classList.add('destroyed');
        selectedCard.removeEventListener('click', selectCard);
        selectedCard = null;
        selectedWord = null;
        matchedPairs++;
        showMessage(correctMessage, audioCorrecto);
    
        if (matchedPairs === totalPairs) {
            completedMessage.style.display = 'block';
        }
    
        // Verificar si todas las cartas están deshabilitadas
        const allDisabled = Array.from(cards).every(card => card.classList.contains('destroyed'));
    
        if (allDisabled) {
            // Todas las cartas están deshabilitadas, mostrar la flecha
            const arrowIcon = document.getElementById('arrow-icon');
            const modal = document.getElementById("modal");
            if (modal) {  // Verificación adicional
                modal.style.display = "flex";
                modal.classList.add("show");
                arrowIcon.style.display = 'inline-block';
                arrowIcon.addEventListener('click', function() {
                    window.location.href = '../Juego2/game2.html';
                });
    
                // Ocultar el modal después de 10 segundos
                setTimeout(() => {
                    modal.classList.remove("show");
                    modal.classList.add("hide");
                    setTimeout(() => {
                        modal.style.display = "none";
                        modal.classList.remove("hide");
                    }, 500); 
                }, 1000); // 10000 milisegundos = 10 segundos
            } else {
                console.error('El elemento con el ID "modal" no existe en el DOM.');
            }
        }
    }
    
    

    function incorrectMatch() {
        selectedCard.classList.add('incorrect');
        selectedWord.classList.add('incorrect');
        selectedCard.classList.remove('selected');
        selectedCard.style.border = '';
        selectedCard.style.transform = '';
        selectedCard = null;
        selectedWord = null;
        attempts++;
        showMessage(errorMessage, audioIncorrecto);

        lives--;
        if (lives >= 0) {
            animateHeartDisappearance(hearts[lives]);
        }

        if (attempts === maxAttempts) {
            setTimeout(mostrarGameOver, 500);
        }
    }

    function mostrarGameOver() {
        modalGameOver.style.display = 'block';
        audioGameOver.play();
    }

    function animateHeartDisappearance(heart) {
        heart.style.transition = 'opacity 0.5s ease-out';
        heart.style.opacity = '0';
        setTimeout(() => {
            heart.style.display = 'none';
        }, 500);
    }

    function showMessage(messageElement, audio) {
        messageElement.style.display = 'block';
        playAudio(audio);
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 1000);
    }

    function playAudio(audio) {
        audio.currentTime = 0;
        audio.play();
    }
});
