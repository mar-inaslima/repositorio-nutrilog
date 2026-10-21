
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

  let carrinho = JSON.parse(localStorage.getItem('nutrilog')) || [];
            
        document.addEventListener("DOMContentLoaded", atualizarCarrinho);

        
        document.addEventListener("click", function(e) {
            
            if (e.target.classList.contains("btn-adicionar")) {
                const nome = e.target.dataset.nome;
                const preco = parseFloat(e.target.dataset.preco);

                carrinho.push({ nome, preco });
                localStorage.setItem('nutrilog', JSON.stringify(carrinho));
                atualizarCarrinho();
                
                alert(nome + " foi adicionado ao carrinho!");
            }

           
            if (e.target.id === "btn-finalizar") {
                alert("Pedido finalizado com sucesso! Obrigado por escolher a Nutrilog.");
                carrinho = [];
                localStorage.removeItem('nutrilog');
                atualizarCarrinho();
            }
        });

        
        function atualizarCarrinho() {
            const lista = document.getElementById("itens-carrinho");
            const totalSpan = document.getElementById("valor-total");
            const qtdSpan = document.getElementById("quantidade-itens");
            const btnFinalizar = document.getElementById("btn-finalizar");

            if (!lista) return;

            lista.innerHTML = "";
            let total = 0;

            if (carrinho.length === 0) {
                lista.innerHTML = '<p class="carrinho-vazio">O carrinho está vazio.</p>';
                if (totalSpan) totalSpan.textContent = "0,00";
                if (qtdSpan) qtdSpan.textContent = "0";
                if (btnFinalizar) btnFinalizar.disabled = true;
                return;
            }

            carrinho.forEach((item, index) => {
                total += item.preco;
                lista.innerHTML += `
                    <div class="item-carrinho">
                        <span>${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                        <button class="btn-remover" onclick="remover(${index})">Remover</button>
                    </div>
                `;
            });

            if (totalSpan) totalSpan.textContent = total.toFixed(2).replace('.', ',');
            if (qtdSpan) qtdSpan.textContent = carrinho.length;
            if (btnFinalizar) btnFinalizar.disabled = false;
        }

   
        window.remover = function(index) {
            carrinho.splice(index, 1);
            localStorage.setItem('nutrilog', JSON.stringify(carrinho));
            atualizarCarrinho();
        };
