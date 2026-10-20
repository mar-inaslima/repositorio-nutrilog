
// botoes de ver mais e acesso as opcoes

document.getElementById('btn-marmita').addEventListener('click', function() {
  window.location.href = 'marmita.html'; 
});

document.getElementById('btn-salada').addEventListener('click', function() {
  window.location.href = 'salada.html'; 
});

document.getElementById('btn-sobremesa').addEventListener('click', function() {
  window.location.href = 'sobremesa.html'; 
});

//logica de filtros
document.addEventListener('DOMContentLoaded', function()  {
  const AplicarFiltros = document.getElementById('aplicar-filtros');
  const cartoes = document.querySelectorAll('.card-marmita');

  AplicarFiltros.addEventListener('click', function()  {
    const restricoes = Array.from(document.querySelectorAll('.filtro-restricao:checked')).map(input => input.value);
    const refeicoes = Array.from(document.querySelectorAll('.filtro-refeicao:checked')).map(input => input.value);
    const entrega = document.querySelector('input[name="entrega"]:checked');
    const entregaValue = entrega ? entrega.value : null;

    cartoes.forEach(cartao => {
      const cartaoRestricoes = cartao.dataset.restricao ? cartao.dataset.restricao.split(' ') : [];
      const cartaoRefeicao = cartao.dataset.refeicao ? cartao.dataset.refeicao.split(' ') : [];
      const cartaoEntrega = cartao.dataset.entrega ? cartao.dataset.entrega.split(' ') : [];

      const atendeRestricoes = restricoes.every(restricao => cartaoRestricoes.includes(restricao));

      const atendeRefeicoes = refeicoes.length === 0 || refeicoes.some(refeicao => cartaoRefeicao.includes(refeicao));

      const atendeEntrega = !entregaValue || cartaoEntrega.includes(entregaValue);

      if (atendeRestricoes && atendeRefeicoes && atendeEntrega) {
        cartao.style.display = 'flex'; }
      else {
        cartao.style.display = 'none'; }
  });
    });
});

// logica do carrinho

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.querySelectorAll('.btn-adicionar').forEach(botao => {
  botao.addEventListener('click', function() {
    // 1. Pega os dados do botão
    const item = { nome: this.dataset.nome, preco: parseFloat(this.dataset.preco) };
    
    // 2. Salva na lista
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${item.nome} foi ao carrinho!`);
  });
});

const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const lista = document.getElementById('lista-carrinho');
let total = 0;

// 2. Percorre a lista para mostrar na tela e somar o total
carrinho.forEach(item => {
  total += item.preco;
  lista.innerHTML += `<li>${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</li>`;
});

// 3. Exibe o total
document.getElementById('total').textContent = total.toFixed(2).replace('.', ',');