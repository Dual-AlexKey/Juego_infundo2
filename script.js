let clicado = false;
var flechaSound = document.getElementById('flechaSound');

document.getElementById('flecha').addEventListener('click', function() {
    flechaSound.currentTime = 0;
    flechaSound.volume = 0.1;
    flechaSound.play();

    const bloque1 = document.querySelector('.bloque1');
    const bloque2 = document.querySelector('.bloque2');

    if (bloque1.style.display === 'block') {
        bloque1.style.display = 'none';
        bloque2.style.display = 'block';
        document.getElementById('flecha').style.transform = 'rotate(180deg)';
    } else {
        bloque1.style.display = 'block';
        bloque2.style.display = 'none';
        document.getElementById('flecha').style.transform = 'rotate(0deg)';
    }
});

function reproducirSonidoHover() {
    var sonidoHover = document.getElementById('hoverSound');
    sonidoHover.volume = 0.1;
    sonidoHover.currentTime = 0; // Reinicia el sonido para reproducirlo desde el principio
    sonidoHover.play();
}

// Event listeners para el primer grupo de botones
document.getElementById('btn1').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn2').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn3').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn4').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn5').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn6').addEventListener('mouseover', reproducirSonidoHover);

// Event listeners para el segundo grupo de botones
document.getElementById('btn7').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn8').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn9').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn10').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn11').addEventListener('mouseover', reproducirSonidoHover);
document.getElementById('btn12').addEventListener('mouseover', reproducirSonidoHover);

// Función para manejar el redireccionamiento de los botones
function handleModule(event) {
    const modulo = event.target.dataset.module; // Obtener el número de módulo del botón
    const moduloEnlace = clicado ? parseInt(modulo) + 6 : parseInt(modulo); // Ajustar el número de módulo en función de si la flecha está clicada o no
    window.location.href = `./modulo${moduloEnlace}/modulo${moduloEnlace}.html`; // Redirigir al módulo correspondiente
}

// Event listeners para los botones del primer grupo
document.getElementById('btn1').addEventListener('click', handleModule);
document.getElementById('btn2').addEventListener('click', handleModule);
document.getElementById('btn3').addEventListener('click', handleModule);
document.getElementById('btn4').addEventListener('click', handleModule);
document.getElementById('btn5').addEventListener('click', handleModule);
document.getElementById('btn6').addEventListener('click', handleModule);

// Event listeners para los botones del segundo grupo
document.getElementById('btn7').addEventListener('click', handleModule);
document.getElementById('btn8').addEventListener('click', handleModule);
document.getElementById('btn9').addEventListener('click', handleModule);
document.getElementById('btn10').addEventListener('click', handleModule);
document.getElementById('btn11').addEventListener('click', handleModule);
document.getElementById('btn12').addEventListener('click', handleModule);

var audio = document.getElementById('audioElement');
audio.volume = 0.3;
