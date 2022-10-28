const fecharJanela = document.querySelector('section span');
const janelaItem = document.querySelector('.janela');
const produtos = document.querySelectorAll('.produtos');
const listaCarrinho = document.querySelector('.lista-carrinho');
const total = document.querySelector('#total');
let spanQtdItem = document.getElementById('qtdi');
let qtdItem = document.getElementById('qtditens');

const lista = {

    carrinho : [
       {
           nome : 'Camisa',
           preco : 10
       },
       
       {
           nome : 'Calça',
           preco : 20
       },
   
       {
           nome : 'Sapato',
           preco : 40
       },
       
   ],

   total: 0,

   addCarrinho: function(nomeItem, add) {
    
     if(spanQtdItem.textContent == 0 && !add) return;

     qtdItem.style.display = 'block';   
     
     for (let item of this.carrinho) {

         if (item.nome === nomeItem) {
             
             item.qtdVolumes ? item.qtdVolumes += Number(spanQtdItem.textContent) : item.qtdVolumes = Number(spanQtdItem.textContent);
             
             item.qtdItemAdd = Number(spanQtdItem.textContent)

             spanQtdItem.textContent = 0;

             if (!item.quantidade) {

                item.quantidade = 1;
                this.attCestaQtd(item.quantidade)
            }
                
            if (add != 'atacado') {
                item.qtdVolumes += 1
            }
                
             
             this.attCestaItems(item,add)
        }
         
     }
  },

    removeCarrinho : function(nomeItem) {
        
        for (let item of this.carrinho) {

            if (item.nome === nomeItem) {

                item.qtdVolumes -= 1
                if (!item.qtdVolumes) item.quantidade -= 1;

                this.attCestaItems(item)
            }

        }
    },
   
   attCestaItems : function({ nome, preco, qtdVolumes, qtd, qtdItemAdd },add) {
       
       for (const item of this.carrinho) {
           
           if (item.nome === nome) {
               
               const listaCompleta = document.querySelectorAll('.lista-carrinho');
               
               listaCompleta.forEach((x) => {
                   
                    const total = (qtdVolumes * preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    const produtoCarrinho = document.createElement('p');
                    const novoValor = document.createElement('p');
                    const verificarSeTemItem = x.getElementsByClassName(nome)[0];
                    
                    add != 'atacado' ? this.calcularTotal(preco, add) : this.calcularTotal(qtdItemAdd * preco, add)

                    if (!qtdVolumes) {
                        x.removeChild(verificarSeTemItem);

                        this.attCestaQtd(qtd);
                        return
                    }

                    if (x.getElementsByClassName(nome)[0]) {
                        
                        verificarSeTemItem.querySelector('b').innerHTML = `Quantidade: ${qtdVolumes} Total: ${total} <span class="remover" onclick="lista.removeCarrinho('${nome}')">remover</span>`
                        return
                    }
                        produtoCarrinho.classList.add(nome);
                        listaCarrinho.appendChild(produtoCarrinho);
                        produtoCarrinho.innerHTML = `<br /> <p> Produto : ${nome} <strong class="adicionar" onclick="lista.addCarrinho('${nome}','add')">adicionar</strong></p>`
                        produtoCarrinho.appendChild(novoValor);
                        novoValor.innerHTML = `<b> Quantidade: ${qtdVolumes} Total: ${total} <span class="remover" onclick="lista.removeCarrinho('${nome}')">remover</span></b> <br />`
                    
                })
            }
        }
    },

    attCestaQtd : (qtd) => {
        qtd ? qtdItem.textContent = Number(qtdItem.textContent) + 1 : qtdItem.textContent -= 1

        if (qtdItem.textContent == 0) {
            qtdItem.style.display = 'none';  
        }
    },

    calcularTotal : (total,add) => {

        if (!total) total.style.display = 'none';
        total && add ? lista.total += total : lista.total -= total;
        total.textContent = `Total: ${lista.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`;
    }
    
}

produtos.forEach((item) => {
     
    const eventClickHandler = item.addEventListener('click', () => {
        
        janelaItem.style.display = 'block';
        item.classList.add('show');

        item.querySelector('.carrinho')
        .classList.add('show_quantidades');
        fecharJanela.style.display = 'block'
        item.removeEventListener('click', eventClickHandler)
    });
    
    item.querySelector('.carrinho_botao')
    .addEventListener('click', () => lista.addCarrinho(item.querySelector('h3').textContent, 'atacado'));
    
    fecharJanela.addEventListener('click', () => fecharJanelaCompra(item))
}); 

qtdItem.addEventListener('click', () => {

    listaCarrinho.classList.add('show');
    fecharJanela.style.display = 'block';

})


function fecharJanelaCompra(el){
        spanQtdItem.textContent = 0
        listaCarrinho.classList.remove('show');
        el.classList.remove('show');
        fecharJanela.style.display = 'none';
        janelaItem.style.display = 'none';
        el.querySelector('.carrinho').classList.remove('show_quantidades');
}

function decrement(){

    if(spanQtdItem.textContent > 0){
      spanQtdItem.textContent--;
    } 
}
function increment(){
     spanQtdItem.textContent++; 
}
