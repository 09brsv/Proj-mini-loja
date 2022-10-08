const fecharJanela = document.querySelector('.flex span');
const janelaItem = document.querySelector('.janela');
const produtos = document.querySelectorAll('.produtos');
const produtoCarrinho = document.createElement('p');

// const addCarrinho = document.getElementsByClassName('carrinho_botao')
const listaCarrinho = document.getElementsByClassName('lista-carrinho')[0]
const closeCar = document.querySelector('#close');
let spanQtdItem = document.getElementById('qtdi');
let qtdItem = document.getElementById('qtditens');
let temProduto = false;
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

   quantidadeItems : [0],

   addCarrinho: function(nomeItem) {

     if(spanQtdItem.textContent == 0) return;

     qtdItem.style.display = 'block';
     
     
     for (let item of this.carrinho) {

         if (item.nome === nomeItem) {
             
             if (item.quantidade) {
     
                 item.quantidade += 1
             } else{
     
                 item.quantidade = 1;
                 // lista.quantidadeItems.push(1)
                 qtdItem.textContent = Number(qtdItem.textContent) + 1
             }
             
             item.qtdVolumes ? item.qtdVolumes += Number(spanQtdItem.textContent) : item.qtdVolumes = Number(spanQtdItem.textContent);
             spanQtdItem.textContent = 0;
            //  return this.addCestaItems(item, qtdVolumes)
             if (temProduto) {

                // this.addCestaItems(item)
                item.qtdVolumes += Number(spanQtdItem.textContent)
                console.log(item)
             }
             else {
              
                produtoCarrinho.classList.add('produtoCarrinho');
                listaCarrinho.appendChild(produtoCarrinho);
                produtoCarrinho.innerHTML = `<p> Adicionado: </p> <p> Produto : ${this.attQtdVolumes(item)} ${item.nome}(s) </p>
                <p> Total : ${this.attCestaItems(item)} </p> <hr /><br />`
                temProduto = true
            }
        }
         
     }
    //  console.log(item.quantidade)
    //  lista.attCestaItems(nomeItem, item.quantidade, item.preco)
 },

    removeCarrinho : function(nomeItem) {
        
        for (let item of this.carrinho) {

            if (item.nome === nomeItem) {

                item.qtdVolumes -= 1
                console.log(item)
            }
        }
    },
   
   attCestaItems : ({ preco, qtdVolumes }) => {
       
       const total = qtdVolumes * preco
       return total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

       
    },

    attQtdVolumes : ({qtdVolumes}) => {

        return qtdVolumes
    }
    
}

let nomeItem;
produtos.forEach((item) => {
     
    item.addEventListener('click', () => {
        nomeItem = item.querySelector('h3').textContent;
        janelaItem.style.display = 'block';
        item.classList.add('show');
        item.querySelector('.carrinho').classList.add('show_quantidades');
        fecharJanela.style.display = 'block'

        item.querySelector('.carrinho_botao').addEventListener('click',lista.addCarrinho(nomeItem));
    });

    fecharJanela.addEventListener('click', () => {
    
        item.classList.remove('show')
        fecharJanela.style.display = 'none';
        janelaItem.style.display = 'none';
        item.querySelector('.carrinho').classList.remove('show_quantidades');
    })
}); 

qtdItem.addEventListener('click', () => {

    listaCarrinho.classList.add('show');
    document.querySelector('.flex').style.display = 'none';
})

closeCar.addEventListener('click', function () {
    lista.removeCarrinho('Camisa')
})


function decrement(){

    if(spanQtdItem.textContent > 0){
      spanQtdItem.textContent--;
    //   removeCamisa();
    //   attLista();
    } 
}
function increment(){
     spanQtdItem.textContent++; 
    //  addCamisa();
    //  attLista();
}


// function attLista(){
//    listaCarrinho.style.display = 'none';
//    qtdItem.style.display = 'none';
// }


// addCarrinhoOne.addEventListener('click',()=>{
//     if(spanQtdItemOne.textContent == 0) return;
//     qtdItem.style.display = 'block';
//     qtdItem.textContent = Number(qtdItem.textContent) + Number(spanQtdItemOne.textContent);
//     spanQtdItemOne.textContent = 0;
// })
// addCarrinhoTwo.addEventListener('click',()=>{
//     if(spanQtdItemTwo.textContent == 0) return;
//     qtdItem.style.display = 'block';
//     qtdItem.textContent = Number(qtdItem.textContent) + Number(spanQtdItemTwo.textContent);
//     spanQtdItemTwo.textContent = 0;
// })

let temCamisa = false;
function addCamisa(qtd){

    const { nome, quantidade } = lista.carrinho[0]

    // if(temCamisa) return atualizaCamisa();
    
    const novaCamisa = document.createElement('p');
    novaCamisa.classList.add('novaCamisa')
    listaCarrinho.appendChild(novaCamisa);
    novaCamisa.innerHTML = `<p> Adicionado: </p> <p> Produto : ${qtd} ${nome} </p>
    <p> Total : R$ ,00 </p> <hr /><br />`
    temCamisa = true;
}

let qtdCamisa = 1;
// let camisaTotal = camisa.preço;

function atualizaCamisa(){
    qtdCamisa++;
    camisaTotal = camisaTotal + camisa.preço;
    atualizaQtdCamisa();
}

function removeCamisa() {
    if (!temCamisa) return; 
    qtdCamisa--;
    camisaTotal = camisaTotal - camisa.preço;
    atualizaQtdCamisa();
}

function atualizaQtdCamisa(){
    let novaCamisa = document.getElementsByClassName('novaCamisa')[0];
    if (qtdCamisa == 0){
        novaCamisa.style.display = 'none';
    }
    novaCamisa.innerHTML = `<p> Adicionado: </p> <p> Produto : ${qtdCamisa} ${camisa.nome}s </p>
    <p> Total : R$ ${camisaTotal},00 </p><hr /><br />`;
}


let temCalca = false;
function addCalca(){
    if(temCalca) return atualizaCalca();
    
    const novaCalca = document.createElement('p');
    novaCalca.classList.add('novaCalca')
    listaCarrinho.appendChild(novaCalca);
    novaCalca.innerHTML = `<p> Adicionado: </p> <p> Produto : 1 ${calca.nome} </p>
    <p> Total : R$ ${calca.preço},00 </p><hr /><br />`
    temCalca = true;
}

let qtdCalca =1;
// let calcaTotal = calca.preço;

function atualizaCalca(){
    qtdCalca++;
    // calcaTotal = calcaTotal + calca.preço;
    atualizaQtdCalca();
}

function removeCalca() {
    if (!temCalca) return; 
    qtdCalca--;
    // calcaTotal = calcaTotal - calca.preço;
    atualizaQtdCalca();
}

function atualizaQtdCalca(){
    let novaCalca = document.getElementsByClassName('novaCalca')[0];
    if (qtdCalca == 0){
        novaCalca.style.display = 'none';
    }
    novaCalca.innerHTML = `<p> Adicionado: </p> <p> Produto : ${qtdCalca} ${calca.nome}s </p>
    <p> Total : R$ ${calcaTotal},00 </p><hr /><br />`;
}


let temSapato = false;
function addSapato(){
    if(temSapato) return atualizaSapato();
    
    const novoSapato = document.createElement('p');
    novoSapato.classList.add('novoSapato')
    listaCarrinho.appendChild(novoSapato);
    novoSapato.innerHTML = `<p> Adicionado: </p> <p> Produto : 1 ${sapato.nome} </p>
    <p> Total : R$ ${sapato.preço},00 </p><hr /><br />`
    temSapato = true;
}

let qtdSapato = 1;
// let sapatoTotal = sapato.preço;

function atualizaSapato(){
    qtdSapato++;
    sapatoTotal = sapatoTotal + sapato.preço;
    atualizaQtdSapato();
}

function removeSapato() {
    if (!temSapato) return; 
    qtdSapato--;
    sapatoTotal = sapatoTotal - sapato.preço;
    atualizaQtdSapato();
}

function atualizaQtdSapato(){
    let novoSapato = document.getElementsByClassName('novoSapato')[0];
    if (qtdSapato == 0){
        novoSapato.style.display = 'none';
    }
    novoSapato.innerHTML = `<p> Adicionado: </p> <p> Produto : ${qtdSapato} ${sapato.nome}s </p>
    <p> Total : R$ ${sapatoTotal},00 </p><hr /> <br />`;
}



// closeCar.addEventListener('click', () => {
// const calcaLista = document.getElementsByClassName('novaCalca')[0];
// const sapatoLista = document.getElementsByClassName('novoSapato')[0];
// const camisaLista = document.getElementsByClassName('novaCamisa')[0];

//     qtdCamisa = 1;
//     camisaTotal = camisa.preço;
//     if(camisaLista) camisaLista.remove();
//     temCamisa = false;
//     qtdCalca = 1;
//     calcaTotal = calca.preço;
//     temCalca = false;
//     if(calcaLista) calcaLista.remove();
//     qtdSapato = 1;
//     sapatoTotal = sapato.preço;
//     temSapato = false;
//     if(sapatoLista) sapatoLista.remove();
//     qtdItem.textContent = 0;
//     attLista();
// })


// function decrementOne(){
//   if(spanQtdItemOne.textContent > 0){
//       spanQtdItemOne.textContent--;
//       attLista();
//       removeCalca();
//     } 
// }
// function incrementOne(){
//      spanQtdItemOne.textContent++;
//      attLista();
//      addCalca();
// }
// function decrementTwo(){
//   if(spanQtdItemTwo.textContent > 0){
//       spanQtdItemTwo.textContent--;
//       attLista();
//       removeSapato();
//     } 
// }
// function incrementTwo(){
//      spanQtdItemTwo.textContent++;
//      attLista();
//      addSapato();
// }