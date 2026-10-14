document.addEventListener('DOMContentLoaded', function() {
 
    const botoesComida = document.querySelectorAll('.comida');
 
    botoesComida.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const nomeComida = botao.innerText;
            alert('Você selecionou: ' + nomeComida);
        });
    });
 
 
    const outrosBotoes = document.querySelectorAll('button:not(.comida)');
 
    outrosBotoes.forEach(function(botao) {
        botao.addEventListener('click', function() {
            alert('Ação realizada: ' + botao.innerText);
        });
    });
 
});