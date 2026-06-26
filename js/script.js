
const primeiraVisita =
localStorage.getItem('jaVisitouYuro') === 'false';

const usuarioLogado =
localStorage.getItem(
'usuarioLogado'
);

if(!usuarioLogado){

  window.location.replace(
    'login.html'
  );

  throw new Error(
    'Usuário não logado'
  );

}


let historico =
  JSON.parse(
    localStorage.getItem('historico')
  ) || [];

  let caixinhas =
JSON.parse(
  localStorage.getItem('caixinhas')
) || [

  {
    nome: "💰 Reserva",
    valor: 0
  },

  {
    nome: "✈️ Viagem",
    valor: 0
  },

  {
    nome: "🎮 Games",
    valor: 0
  },

  {
    nome: "🏠 Casa",
    valor: 0
  }

];

  let jaFalouBomDia = false;
  function verificarSaldo(saldoAtual){

if(saldoAtual <= 0){

  falar(
    "🙀 Zeramos tudo!",
    "linear-gradient(135deg,#111827,#374151)",
    "#9ca3af"
  );

}

else if(saldoAtual < 100){

  falar(
    "😿 Estamos ficando sem moedas...",
    "linear-gradient(135deg,#dc2626,#ef4444)",
    "#fca5a5"
  );

}

else if(saldoAtual > 10000){

  falar(
    "👑 Miau... isso é riqueza de gato nobre.",
    "linear-gradient(135deg,#f59e0b,#fbbf24)",
    "#fde68a"
  );

}

else if(saldoAtual > 5000){

  falar(
    "😺 Estamos ricos!",
    "linear-gradient(135deg,#10b981,#22c55e)",
    "#86efac"
  );

}
}

function obterSaldo(){

  return parseFloat(
    document
      .querySelector('.saldo-valor')
      .innerText
      .replace('R$ ','')
      .replace('.','')
      .replace(',','.')
  );

}

function atualizarSaldo(saldoAtual){

  const saldoElement =
  document.querySelector('.saldo-valor');

  const novoTextoSaldo =
  'R$ ' +
  saldoAtual
    .toFixed(2)
    .replace('.', ',');

  saldoElement.innerText =
  novoTextoSaldo;

  localStorage.setItem(
    'saldo',
    novoTextoSaldo
  );
} 

  function obterLimite(){

    return parseFloat(
        document
            .querySelector('.limite-valor')
            .innerText
            .replace('R$ ','')
            .replace('.','')
            .replace(',','.')
    );

}

function atualizarLimite(limiteAtual){

    const limiteElement =
    document.querySelector('.limite-valor');

    const novoTexto =
    'R$ ' +
    limiteAtual
        .toFixed(2)
        .replace('.', ',');

    limiteElement.innerText = novoTexto;

    localStorage.setItem(
        'limite',
        novoTexto
    );

}

window.addEventListener(
'DOMContentLoaded',
function(){

  const saldoSalvo =
  localStorage.getItem('saldo');

  if(saldoSalvo){

    document.querySelector(
      '.saldo-valor'
    ).innerText = saldoSalvo;

  }

  const limiteSalvo =
  localStorage.getItem('limite');

  if(limiteSalvo){

    document.querySelector(
      '.limite-valor'
    ).innerText = limiteSalvo;

  }

});

const botaoPix = document.querySelectorAll('.atalho')[0];
botaoPix.addEventListener('click', function () {
  let saldoAtual = obterSaldo();
  const valorTransferencia = 100;


  if (saldoAtual >= valorTransferencia) {

mostrarToast(
`✅ Pix enviado!<br>
R$ ${valorTransferencia.toFixed(2).replace('.', ',')}
transferidos.`
);

 falar(
  "💸 Lá se foram algumas YuCoins...",
  "linear-gradient(135deg,#ef4444,#f87171)",
  "#fca5a5"
);



    historico.push(`
  <div class="movimentacao">
    <div class="data">
      ${gerarDataHora()}
    </div>

    <div class="descricao">
      ✅ Pix enviado
    </div>

    <div class="valor valor-saida">
  - R$ ${valorTransferencia}
</div>
  </div>
`);
localStorage.setItem(
'historico',
JSON.stringify(historico)
);
    
    let novoSaldo = saldoAtual - valorTransferencia;
    

    atualizarSaldo(novoSaldo);

setTimeout(() => {

  verificarSaldo(novoSaldo);

}, 4500);


  } else {

mostrarToast(
`❌ Saldo insuficiente!<br>
Transferência não realizada.`
);

  }
});

// ==================== PAGAR ====================
const BotaoPagar = document.querySelectorAll('.atalho')[1];

BotaoPagar.addEventListener('click', function () {

let saldoAtual = obterSaldo();

  const valorPagamento = 150;
  

  if (saldoAtual >= valorPagamento) {

    mostrarToast(
`💳 Pagamento realizado!<br>
R$ ${valorPagamento.toFixed(2).replace('.', ',')}
pagos.`
);

    historico.push(`
      <div class="movimentacao">
        <div class="data">
          ${gerarDataHora()}
        </div>

        <div class="descricao">
          💳 Conta paga
        </div>

        <div class="valor valor-saida">
          - R$ ${valorPagamento}
        </div>
      </div>
    `);

    localStorage.setItem(
      'historico',
      JSON.stringify(historico)
    );

    let novoSaldo =
      saldoAtual - valorPagamento;

    atualizarSaldo(novoSaldo);

falar(
  "📄 Conta paga! Menos uma preocupação.",
  "linear-gradient(135deg,#3b82f6,#60a5fa)",
  "#93c5fd"
);


      setTimeout(() => {

  verificarSaldo(novoSaldo);

}, 4500);

  } else {

    mostrarToast(
`❌ Saldo insuficiente!<br>
Pagamento não realizado.`
);

  }

});
// ==================== DEPOSITO ====================
const BotaoDeposito =
document.querySelectorAll('.atalho')[2];

BotaoDeposito.addEventListener(
'click',
function() {

  document
    .getElementById('modal-deposito')
    .classList.add('mostrar');

  document
    .getElementById('valor-deposito')
    .focus();
});


const botaoCancelar =
document.getElementById(
'cancelar-deposito'
);

botaoCancelar.addEventListener(
'click',
function() {

  document
    .getElementById('modal-deposito')
    .classList.remove('mostrar');
  
});

document.addEventListener(
'keydown',
function(event) {

  if (event.key === 'Escape') {

    document
      .getElementById('modal-deposito')
      .classList.remove('mostrar');
      
  }

});

const modalDeposito =
document.getElementById(
  'modal-deposito'
);

modalDeposito.addEventListener(
'click',
function(event) {

  if (
    event.target === modalDeposito
  ) {

    modalDeposito
      .classList.remove(
        'mostrar'
      );

  }

});

const botaoConfirmar =
document.getElementById(
  'confirmar-deposito', 
);


const inputDeposito =
document.getElementById(
  'valor-deposito'
);

inputDeposito.addEventListener(
'keydown',
function(event) {

  if (event.key === 'Enter') {

    botaoConfirmar.click();

  }

});

botaoConfirmar.addEventListener(
'click',

function() {

  const valor =
    document.getElementById(
      'valor-deposito'
    ).value;

  const valorDeposito =
    parseFloat(
      valor.replace(',', '.')
    );

  if (
    isNaN(valorDeposito)
    || valorDeposito <= 0
  ) {

    const toast =
document.getElementById(
  'toast-sucesso'
);

toast.innerHTML =
`⚠️ Valor inválido!<br>
Digite um valor maior que zero.`;

toast.classList.add(
  'mostrar'
);

setTimeout(
function() {

  toast.classList.remove(
    'mostrar'
  );

},
3000
);

return;

  }
  
  let saldoAtual = obterSaldo();

  saldoAtual += valorDeposito;

 atualizarSaldo(saldoAtual);

const saldoElement =
document.querySelector('.saldo-valor');

setTimeout(() => {

falar(
  "😻 Adoro quando o saldo cresce!",
  "linear-gradient(135deg,#22c55e,#4ade80)",
  "#86efac"
);
}, 500);

setTimeout(() => {

  verificarSaldo(saldoAtual);

}, 4500);

    saldoElement.classList.add(
  'saldo-animado'
);

setTimeout(
function() {

  saldoElement.classList.remove(
    'saldo-animado'
  );

},
1000
);


  historico.push(`
    <div class="movimentacao">
      <div class="data">
        ${gerarDataHora()}
      </div>

      <div class="descricao">
        💰 Depósito recebido
      </div>

     <div class="valor valor-entrada">
  + R$ ${valorDeposito}
</div>
    </div>
  `);

  localStorage.setItem(
    'historico',
    JSON.stringify(historico)
  );

  document
    .getElementById(
      'valor-deposito'
    ).value = '';

  document
    .getElementById(
      'modal-deposito'
    )
    .classList.remove(
      'mostrar'
    );

 const toast =
document.getElementById(
  'toast-sucesso'
);

document.getElementById(
  'toast-valor'
).innerText =
  `R$ ${valorDeposito.toFixed(2).replace('.', ',')} adicionados ao saldo.`;

toast.classList.add(
  'mostrar'
);

setTimeout(
function() {

  toast.classList.remove(
    'mostrar'
  );

},
3000
);

});


// ==================== EXTRATO ====================
const botaoExtrato =
  document.querySelectorAll('.atalho')[3];

botaoExtrato.addEventListener(
  'click',
  function () {

falar(
     "🕵️ Vamos descobrir quem gastou tudo...",
  "linear-gradient(135deg,#78350f,#92400e)",
  "#d6a46b"
    );

    const extratoBox =
      document.getElementById(
        'extrato-box'
      );

    const listaExtrato =
      document.getElementById(
        'lista-extrato'
      );

    listaExtrato.innerHTML = '';

    if (!extratoBox.classList.contains('mostrar')) {

      listaExtrato.innerHTML = '';

      if (historico.length === 0) {

        listaExtrato.innerHTML = `
      <div class="item-extrato">
        Nenhuma movimentação encontrada.
      </div>
    `;

      } else {

        historico.forEach(item => {
          listaExtrato.innerHTML += item;
        });

      }

    }

    extratoBox.classList.toggle('mostrar');

  });


// ==================== CARTÕES COM BENEFÍCIOS EXPANSÍVEIS ====================
const cartoesItens = document.querySelectorAll('.cartao-item');

const beneficios = {
  'yuro-start': '<span style="color: #b871ff;">💜</span> Yuro Start: limite inicial de R$ 500,00, sem anuidade, aprovação simples.',
  'yuro-purple': '<span style="color: #a855f7;">🩷</span> Yuro Purple: limite de R$ 3.000,00, programa de pontos, upgrade automático.',
  'yuro-invest': '<span style="color: #10b981;">💚</span> Yuro Invest: limite de R$ 10.000,00, acesso a fundos exclusivos, consultoria de investimentos.',
  'yuro-black': '<span style="color: #fbbf24;">💛</span> Yuro Black: limite de R$ 50.000,00, atendimento premium 24h, sala VIP em aeroportos.'
};

cartoesItens.forEach(item => {
  const beneficiosDiv = item.querySelector('.beneficios-expansiveis');
  const beneficioTexto = beneficiosDiv.querySelector('.beneficio-texto');

  item.addEventListener('click', (event) => {
    event.stopPropagation(); // evita conflitos se houver eventos aninhados

    const cartao = item.querySelector('.cartao');
    const tipo = cartao.classList[1];
    const texto = beneficios[tipo] || '💡 Benefício não encontrado.';
    beneficioTexto.innerHTML = texto;

    // Fecha outros benefícios abertos
    document.querySelectorAll('.beneficios-expansiveis').forEach(div => {
      if (div !== beneficiosDiv) {
        div.classList.remove('mostrar');
      }
    });

    // Alterna a classe .mostrar no benefício atual
    beneficiosDiv.classList.toggle('mostrar');
  });
});


// ==================== CONVERTER LIMITE ====================

// Botão principal
const botaoLimite =
document.querySelectorAll('.atalho')[4];

// Modal
const modalLimite =
document.getElementById(
  'modal-limite'
);

// Input
const inputLimite =
document.getElementById(
  'valor-limite'
);

// Botões
const botaoConfirmarLimite =
document.getElementById(
  'confirmar-limite'
);

const botaoCancelarLimite =
document.getElementById(
  'cancelar-limite'
);

// ==================== ABRIR MODAL ====================

botaoLimite.addEventListener(
'click',
function() {

  modalLimite.classList.add(
    'mostrar'
  );

  inputLimite.focus();

});


// ==================== FECHAR PELO BOTÃO ====================

botaoCancelarLimite.addEventListener(
'click',
function() {

  modalLimite.classList.remove(
    'mostrar'
  );

});


// ==================== FECHAR CLICANDO FORA ====================

modalLimite.addEventListener(
'click',
function(event) {

  if (
    event.target === modalLimite
  ) {

    modalLimite.classList.remove(
      'mostrar'
    );

  }

});


// ==================== FECHAR COM ESC ====================

document.addEventListener(
'keydown',
function(event) {

  if (
    event.key === 'Escape'
  ) {

    modalLimite.classList.remove(
      'mostrar'
    );

  }

});


// ==================== CONFIRMAR COM ENTER ====================

inputLimite.addEventListener(
'keydown',
function(event) {

  if (
    event.key === 'Enter'
  ) {

    botaoConfirmarLimite.click();

  }

});


// ==================== CONVERTER LIMITE ====================

botaoConfirmarLimite.addEventListener(
'click',
function() {

  const valorConvertido =
  parseFloat(
    inputLimite.value
      .replace(',', '.')
  );

  // Valor inválido
  if (
    isNaN(valorConvertido)
    || valorConvertido <= 0
  ) {

    const toast =
    document.getElementById(
      'toast-sucesso'
    );

    toast.innerHTML =
    `⚠️ Valor inválido!`;

    toast.classList.add(
      'mostrar'
    );

    setTimeout(
    function() {

      toast.classList.remove(
        'mostrar'
      );

    },
    3000
    );

    return;
  }

  
 let saldoAtual = obterSaldo();
 let limiteAtual = obterLimite();


  // Saldo suficiente
  if (
    saldoAtual >= valorConvertido
  ) {

    saldoAtual -=
    valorConvertido;

    limiteAtual +=
    valorConvertido;

  atualizarLimite(limiteAtual);
   atualizarSaldo(saldoAtual);

    historico.push(`
      <div class="movimentacao">
        <div class="data">
          ${gerarDataHora()}
        </div>

        <div class="descricao">
          💜 Limite convertido
        </div>

        <div class="valor valor-limite">
          R$ ${valorConvertido}
        </div>
      </div>
    `);

    localStorage.setItem(
      'historico',
      JSON.stringify(
        historico
      )
    );

    const toast =
    document.getElementById(
      'toast-sucesso'
    );

    toast.innerHTML =
    `💜 Limite convertido!<br>
    R$ ${valorConvertido
      .toFixed(2)
      .replace('.', ',')}
    adicionados ao limite.`;

    toast.classList.add(
      'mostrar'
    );

    setTimeout(
    function() {

      toast.classList.remove(
        'mostrar'
      );

    },
    3000
    );

  } else {

    const toast =
    document.getElementById(
      'toast-sucesso'
    );

    toast.innerHTML =
    `❌ Saldo insuficiente!`;

    toast.classList.add(
      'mostrar'
    );

    setTimeout(
    function() {

      toast.classList.remove(
        'mostrar'
      );

    },
    3000
    );

  }

  // Limpa input
  inputLimite.value = '';

  // Fecha modal
  modalLimite.classList.remove(
    'mostrar'
  );

});
// ==================== CARTÃO VIRTUAL ====================
const botaoCartaoVirtual =
  document.querySelectorAll('.atalho')[5];

botaoCartaoVirtual.addEventListener('click', function () {

  const box =
    document.getElementById(
      'cartao-virtual-box'
    );

  const numeroElement =
    document.getElementById(
      'numero-cartao'
    );

  const validadeElement =
    document.getElementById(
      'validade-cartao'
    );

  const cvvElement =
    document.getElementById(
      'cvv-cartao'
    );

  const numeroCartao = [
    Math.floor(Math.random() * 9000 + 1000),
    Math.floor(Math.random() * 9000 + 1000),
    Math.floor(Math.random() * 9000 + 1000),
    Math.floor(Math.random() * 9000 + 1000)
  ].join(' ');

  const mes =
    Math.floor(Math.random() * 12) + 1;

  const ano =
    Math.floor(Math.random() * 5) + 26;

  const validade =
    String(mes).padStart(2, '0')
    + '/'
    + ano;

  const cvv =
    Math.floor(Math.random() * 900) + 100;

  numeroElement.innerText =
    'Número: ' + numeroCartao;

  validadeElement.innerText =
    'Validade: ' + validade;

  cvvElement.innerText =
    'CVV: ' + cvv;

  box.classList.add('mostrar');

});

const saldoElement =
  document.querySelector('.saldo-valor');

const botaoOlho =
  document.getElementById('toggle-saldo');

let saldoVisivel = true;

let saldoOriginal =
saldoElement.innerText;

botaoOlho.addEventListener(
  'click',
  function () {

if (saldoVisivel) {

  saldoOriginal =
  saldoElement.innerText;

  saldoElement.innerText =
    '••••••••';

  botaoOlho.innerText = '🙈';

  saldoVisivel = false;

} else {

  saldoElement.innerText =
    saldoOriginal;

  botaoOlho.innerText = '👁️';

  saldoVisivel = true;

}

  });

  // ==================== BOTAO RESET ====================
  
const botaoReset =
document.querySelector('#btn-reset');

botaoReset.addEventListener(
'click',
function() {

  document
    .getElementById('modal-reset')
    .classList.add('mostrar');

    falar(
  "🙀 Tem certeza disso?!",
  "linear-gradient(135deg,#dc2626,#ef4444)",
  "#fca5a5"
);

});
document
.getElementById('cancelar-reset')
.addEventListener(
'click',
function() {

  document
    .getElementById('modal-reset')
    .classList.remove('mostrar');

falar(
  "😮 Ufa... quase perdi tudo.",
  "linear-gradient(135deg,#22c55e,#4ade80)",
  "#86efac"
);
});
document
.getElementById('confirmar-reset')
.addEventListener(
'click',
function() {

  document
    .getElementById('modal-reset')
    .classList.remove('mostrar');

  localStorage.setItem(
'saldo',
'R$ 1.250,75'
);

localStorage.setItem(
'limite',
'R$ 0,00'
);

localStorage.setItem(
'historico',
JSON.stringify([])
);

localStorage.setItem(
'caixinhas',
JSON.stringify([
  { nome: "💰 Reserva", valor: 0 },
  { nome: "✈️ Viagem", valor: 0 },
  { nome: "🎮 Games", valor: 0 },
  { nome: "🏠 Casa", valor: 0 }
]));

  const toast =
  document.getElementById(
    'toast-sucesso'
  );

  toast.innerHTML =
  `🔄 Conta resetada!<br>
   Todos os dados foram apagados.`;

  toast.classList.add(
    'mostrar'
  );


setTimeout(() => {

falar(
  "😹 Eu juro que dessa vez vamos gastar menos.",
   "linear-gradient(135deg,#f59e0b,#fbbf24)",
  "#fde68a",
  "#111111"
);

}, 1000);

  setTimeout(
  function() {

    location.reload();

  },
  4000
  );

});

const modalReset =
document.getElementById(
  'modal-reset'
);

modalReset.addEventListener(
'click',
function(event) {

  if (
    event.target === modalReset
  ) {

    modalReset.classList.remove(
      'mostrar'
    );

  }

});

document.addEventListener(
'keydown',
function(event) {

  if (
    event.key === 'Escape'
  ) {

    document
      .getElementById(
        'modal-reset'
      )
      .classList.remove(
        'mostrar'
      );

  }

});


// --------------------- GATO YURO MASCOTE ---------------------
let posicao = 15;
let direcao = 1;
let indiceMensagem = 0;
const gato = document.getElementById("gato-animado");
const mascote = document.getElementById("mascote-yuro");

const andando = [
  "assets/mascote/gato-andando-1.png",
  "assets/mascote/gato-andando-2.png",
  "assets/mascote/gato-andando-3.png",
  "assets/mascote/gato-andando-4.png"
];

function andar() {

  let frame = 0;

  const animacao = setInterval(() => {

    gato.src = andando[frame];

    frame = (frame + 1) % andando.length;

  }, 250);

 const caminhada = setInterval(() => {

  posicao += 3 * direcao;

  if (
    posicao >=
    window.innerWidth - 120
  ) {

    direcao = -1;

    gato.style.transform =
      "scaleX(-1)";
  }

  if (
    posicao <= 0
  ) {

    direcao = 1;

   gato.style.transform =
      "scaleX(1)";
  }

  mascote.style.left =
    posicao + "px";

}, 40);



  setTimeout(() => {

    clearInterval(animacao);
    clearInterval(caminhada);

    pararOlhoAberto();

  }, 8000);

}

function pararOlhoAberto() {

  gato.src = "assets/mascote/gato-parado-olhos-abertos.png";

  setTimeout(() => {

    piscar();

  }, 2000);

}

function piscar() {

  let piscadas = 0;

  const blink = setInterval(() => {

    gato.src = "assets/mascote/gato-parado.png";

    setTimeout(() => {

      gato.src = "assets/mascote/gato-parado-olhos-abertos.png";

    }, 200);

    piscadas++;

    if (piscadas >= 3) {

      clearInterval(blink);

      setTimeout(() => {

        dormir();

      }, 500);

    }

  }, 500);

}

function dormir() {

   gato.src = "assets/mascote/gato-parado.png";

  document.getElementById(
    "zzz"
  ).style.display = "block";

  setTimeout(() => {

    document.getElementById(
      "zzz"
    ).style.display = "none";

    if (!jaFalouBomDia) {

      falar(
        "Bom dia! ☀️",
        "linear-gradient(135deg,#f59e0b,#fbbf24)",
        "#fde68a",
        "#111111"
      );

      jaFalouBomDia = true;

    }

    andar();

  }, 3000);

}

if(usuarioLogado){
  andar();
}

let tempoToast;
let podeGanharMoeda = true;

mascote.addEventListener("click", () => {

  if (!podeGanharMoeda) return;

  podeGanharMoeda = false;

  setTimeout(() => {

    podeGanharMoeda = true;

  }, 2000);

  const mensagens = [

  {
    texto: "💰 Achei moedas atrás do sofá!",
     cor: "linear-gradient(135deg,#059669,#22c55e)",
       borda: "#86efac"
  },

  {
    texto: "🐟 Aceito pagamento em sardinhas.",
    cor: "linear-gradient(135deg,#2563eb,#60a5fa)",
      borda: "#93c5fd"
  },

  {
    texto: "🎁 Olha o presente que trouxe para você!",
    cor: "linear-gradient(135deg,#7c3aed,#c084fc)",
      borda: "#d8b4fe"
  },

  {
    texto: "😹 Quase derrubei o sistema atrás de um peixe.",
     cor:"linear-gradient(135deg,#db2777,#ec4899)",
      borda: "#f9a8d4"
  },


  {
    texto: "🐾 Eu trabalho duro. Às vezes.",
         cor: "linear-gradient(135deg,#92400e,#d97706)",
          borda: "#fbbf24"
  },

  {
    texto: "🐾 Escavei isso para você.",
   cor: "linear-gradient(135deg,#0891b2,#22d3ee)",
        borda: "#67e8f9"
  }

];

  const mensagem =
  mensagens[indiceMensagem];

falar(
  mensagem.texto,
  mensagem.cor,
  mensagem.borda
);

indiceMensagem++;

if (
  indiceMensagem >= mensagens.length
) {

  indiceMensagem = 0;

}
  const moedas =
    Math.floor(Math.random() * 20) + 1;

  let saldoAtual = obterSaldo();

  saldoAtual += moedas;

atualizarSaldo(saldoAtual);

  saldoElement.classList.add(
    "saldo-animado"
  );

  setTimeout(() => {

    saldoElement.classList.remove(
      "saldo-animado"
    );

  }, 1000);

  

  // CHUVA DE MOEDAS

  for(let i = 0; i < 15; i++){

    const moeda =
      document.createElement(
        "div"
      );

    moeda.className =
      "moeda";

    moeda.innerText =
      "🪙";

    moeda.style.left =
      Math.random() *
      window.innerWidth +
      "px";

    document
      .getElementById(
        "chuva-moedas"
      )
      .appendChild(
        moeda
      );

    setTimeout(() => {

      moeda.remove();

    }, 2000);

  }


});


///------------------FALA DO GATO BALAO-----------------------///

const falaGato =
document.getElementById(
  "fala-gato"
);

let tempoFala;

function falar(texto, cor, borda, corTexto = "white"){

  falaGato.innerText =
    texto;

 falaGato.style.setProperty(
  '--cor-balao',
  cor
);

  falaGato.classList.add(
    "mostrar"
  );

  falaGato.style.setProperty(
  '--borda-balao',
  borda
);
 falaGato.style.color = corTexto;
 falaGato.classList.add("mostrar");

  clearTimeout(
    tempoFala
  );

  tempoFala = setTimeout(() => {

    falaGato.classList.remove(
      "mostrar"
    );

  }, 4000);

}

///--------------------CAIXINHASYU----------------------///

let indiceCaixinhaRetirada = null;
let indiceCaixinhaAtual = null;
const frasesCaixinha = [

  "🐾 Escondi tudo num lugar seguro.",
  "😼 Nem eu vou achar esse dinheiro depois.",
  "🐟 Troquei a tentação por planejamento.",
  "🏴‍☠️ Tesouro protegido com sucesso!",
  "😺 Futuro eu agradece.",
  "📦 Guardado. Agora não gaste escondido.",
  "🛡️ Missão concluída: dinheiro protegido.",
  "🐾 Mais um passo rumo à riqueza felina.",
  "😹 Tente não sacar daqui em 5 minutos.",
  "💎 Isso vai fazer falta pro seu eu impulsivo.",
  "🐱 Coloquei sob vigilância máxima.",
  "🏦 Cofre fechado. Sem choradeira depois.",
  "🍗 Resistiu ao lanche, ganhou experiência.",
  "🎯 Meta mais perto de acontecer.",
  "🚀 Pequenos valores, grandes planos."

];

function guardarNaCaixinha(index){

  indiceCaixinhaAtual = index;

  document
    .getElementById('modal-caixinha')
    .classList.add('mostrar');

  document
    .getElementById('valor-caixinha')
    .focus();

}

document
.getElementById('cancelar-caixinha')
.addEventListener('click', () => {

  document
    .getElementById('modal-caixinha')
    .classList.remove('mostrar');

});

document
.getElementById('confirmar-caixinha')
.addEventListener('click', () => {

  const valor =
  parseFloat(
    document
      .getElementById('valor-caixinha')
      .value
      .replace(',', '.')
  );

  if(
    isNaN(valor) ||
    valor <= 0
  ){
    return;
  }

  let saldoAtual = obterSaldo();

  if(valor > saldoAtual){

    const frasesSemSaldo = [

      "😿 Cadê o dinheiro primeiro?",
      "🐾 Não posso guardar moedas imaginárias.",
      "💸 Estamos tentando guardar o que não existe.",
      "😹 Nem eu faço mágica desse nível.",
      "🐟 O cofre recusou a operação.",
      "🙀 Saldo insuficiente para essa aventura.",
      "🪙 Primeiro arrume moedas, depois escondemos.",
      "📦 Não encontrei nada para guardar.",
      "👀 Revirei os bolsos e não achei.",
      "😼 Belo plano... faltou o dinheiro."

    ];

    const frase =
    frasesSemSaldo[
      Math.floor(
        Math.random() *
        frasesSemSaldo.length
      )
    ];

    falar(
      frase,
      "linear-gradient(135deg,#92400e,#b45309)",
      "#fbbf24"
    );

    return;

  }

  saldoAtual -= valor;

  caixinhas[indiceCaixinhaAtual].valor += valor;

 atualizarSaldo(saldoAtual);

  localStorage.setItem(
    'caixinhas',
    JSON.stringify(caixinhas)
  );

  carregarCaixinhas();

  const caixinhaElemento =
  document.querySelectorAll(
    '.caixinha'
  )[indiceCaixinhaAtual];

  if(caixinhaElemento){

    caixinhaElemento.classList.add(
      'caixinha-pulse'
    );

    setTimeout(() => {

      caixinhaElemento.classList.remove(
        'caixinha-pulse'
      );

    }, 800);

  }

  document
    .getElementById('valor-caixinha')
    .value = '';

  document
    .getElementById('modal-caixinha')
    .classList.remove('mostrar');

  const fraseAleatoria =
  frasesCaixinha[
    Math.floor(
      Math.random() *
      frasesCaixinha.length
    )
  ];

  falar(
    fraseAleatoria,
    "linear-gradient(135deg,#6f4e37,#a67b5b)",
    "#d8c3a5"
  );

});

function retirarDaCaixinha(index){

  indiceCaixinhaRetirada = index;

  document
    .getElementById('modal-retirar')
    .classList.add('mostrar');

  document
    .getElementById('valor-retirada')
    .focus(); 
}

function carregarCaixinhas(){

  const lista =
  document.getElementById(
    'lista-caixinhas'
  );

  lista.innerHTML = '';

 const saldoAtual = obterSaldo();

  const totalCaixinhas =
  caixinhas.reduce(
    (total,item) =>
    total + item.valor,
    0
  );

  const patrimonio =
  saldoAtual +
  totalCaixinhas;

  caixinhas.forEach(
    (caixinha,index) => {

      const porcentagem =
      patrimonio > 0
      ? (
          caixinha.valor /
          patrimonio *
          100
        ).toFixed(1)
      : 0;

      lista.innerHTML += `
        <div class="caixinha">

          <div>

            <div class="caixinha-nome">
              ${caixinha.nome}
            </div>

            <div class="caixinha-valor">
              R$ ${caixinha.valor.toFixed(2)}
            </div>

            <div class="caixinha-porcentagem">
              ${porcentagem}% do patrimônio
            </div>

          </div>

          <div class="acoes-caixinha">

            <button
              class="btn-guardar"
              onclick="guardarNaCaixinha(${index})"
            >
              💰 Guardar
            </button>

            <button
              class="btn-retirar"
              onclick="retirarDaCaixinha(${index})"
            >
              💸 Retirar
              </button>
            

          </div>

        </div>
      `;

    }
  );

}

const botaoCaixinhas =
document.getElementById(
  'btn-caixinhas'
);

const caixinhasContainer =
document.querySelector(
  '.caixinhas-container'
);

botaoCaixinhas.addEventListener(
'click',
function(){

  carregarCaixinhas();

  caixinhasContainer.classList.toggle(
    'mostrar'
  );

});

document
.getElementById('valor-caixinha')
.addEventListener('keydown', (event) => {

  if(event.key === 'Enter'){

    document
      .getElementById('confirmar-caixinha')
      .click();

  }

});

document.addEventListener(
'keydown',
(event) => {

  if(event.key === 'Escape'){

    document
      .getElementById('modal-caixinha')
      .classList.remove('mostrar');

  }

});

const modalCaixinha =
document.getElementById(
  'modal-caixinha'
);

modalCaixinha.addEventListener(
'click',
(event) => {

  if(
    event.target === modalCaixinha
  ){

    modalCaixinha.classList.remove(
      'mostrar'
    );

  }

});

document
.getElementById('cancelar-retirada')
.addEventListener('click', () => {

  document
    .getElementById('modal-retirar')
    .classList.remove('mostrar');

});

document
.getElementById('confirmar-retirada')
.addEventListener('click', () => {

  const valor =
  parseFloat(
    document
      .getElementById('valor-retirada')
      .value
      .replace(',', '.')
  );

  if(
    isNaN(valor) ||
    valor <= 0
  ){
    return;
  }

  const index =
  indiceCaixinhaRetirada;

  if(
    valor >
    caixinhas[index].valor
  ){

    falar(
      "😿 Não há tudo isso guardado.",
      "linear-gradient(135deg,#374151,#6b7280)",
      "#9ca3af"
    );

    return;

  }

  let saldoAtual = obterSaldo();

  saldoAtual += valor;

  caixinhas[index].valor -= valor;

atualizarSaldo(saldoAtual);

  localStorage.setItem(
    'caixinhas',
    JSON.stringify(caixinhas)
  );

  carregarCaixinhas();

  document
    .getElementById('valor-retirada')
    .value = '';

  document
    .getElementById('modal-retirar')
    .classList.remove('mostrar');

  const frases = [

    "💸 Missão resgate concluída.",
    "🐾 Dinheiro voltou para casa.",
    "😼 Cofre aberto com sucesso.",
    "🪙 Algumas moedas foram libertadas.",
    "📦 Retirada autorizada pelo gato."

  ];

  falar(

    frases[
      Math.floor(
        Math.random() *
        frases.length
      )
    ],

    "linear-gradient(135deg,#374151,#6b7280)",
    "#9ca3af"

  );

});

document
.getElementById('valor-retirada')
.addEventListener('keydown', (event) => {

  if(event.key === 'Enter'){

    document
      .getElementById('confirmar-retirada')
      .click();

  }

});

document.addEventListener(
'keydown',
(event) => {

  if(event.key === 'Escape'){

    document
      .getElementById('modal-retirar')
      .classList.remove('mostrar');

  }

});

const modalRetirada =
document.getElementById(
  'modal-retirar'
);

modalRetirada.addEventListener(
'click',
(event) => {

  if(
    event.target === modalRetirada
  ){

    modalRetirada.classList.remove(
      'mostrar'
    );

  }

});

///--------------------YUHELP--------------------///

const btnYuHelp =
document.getElementById(
  'btn-yuhelp'
);

const modalYuHelp =
document.getElementById(
  'modal-yuhelp'
);

btnYuHelp.addEventListener(
'click',
() => {

  modalYuHelp.classList.add(
    'mostrar'
  );

});

document
.getElementById(
  'fechar-yuhelp'
)
.addEventListener(
'click',
() => {

  modalYuHelp.classList.remove(
    'mostrar'
  );

});

modalYuHelp.addEventListener(
'click',
(event) => {

  if(
    event.target === modalYuHelp
  ){

    modalYuHelp.classList.remove(
      'mostrar'
    );

  }

});

document.addEventListener(
'keydown',
(event) => {

  if(
    event.key === 'Escape'
  ){

    modalYuHelp.classList.remove(
      'mostrar'
    );

  }

});

const respostasTrabalho = [

"😼 Sim.\n\nAlguém precisava impedir você de gastar tudo.",

"🐾 Trabalho.\n\nMas meu contrato é verbal e envolve sardinhas.",

"🏦 Sou funcionário, gerente e segurança.\n\nO RH ainda está investigando.",

"😺 Desde que o banco abriu.\n\nNinguém descobriu como me demitir.",

"🐱 Sim.\n\nFui promovido por ser fofo.",

"📋 Meu cargo oficial é:\n\nEspecialista em evitar compras duvidosas.",

"😼 Eu trabalho aqui.\n\nA questão é: você trabalha para mim?",

"🏦 Sim.\n\nMas metade do expediente eu passo perseguindo um laser.",

"🐟 Sou pago para cuidar das finanças.\n\nE das sardinhas.",

"😼 Claro.\n\nQuem você acha que aprovou esse Pix suspeito?"

];

function yuHelp(tipo){

switch(tipo){

case 'gastar':

digitarResposta(
`💰 Depende.

Se gastar tudo hoje,
o Yuro de amanhã vai reclamar.`
);

break;

case 'limite':

digitarResposta(
`💳 O limite é dinheiro emprestado.

Parece seu.

Mas depois ele lembra que não é.`
);

break;

case 'caixinha':

digitarResposta(
`📦 São esconderijos oficiais
para o seu dinheiro.`
);

break;

case 'reserva':

digitarResposta(
`🏦 Comece pequeno.

Poucas moedas guardadas
todos os dias viram algo grande.`
);

break;

case 'guardar':

digitarResposta(
`📈 Antes de comprar algo,
espere um pouco.

Metade das vontades desaparece.`
);

break;

case 'gastos':

digitarResposta(
`🚨 Essa pergunta já é suspeita.

Pessoas econômicas
raramente fazem ela.`
);

break;

case 'rico':

const saldo = obterSaldo();

digitarResposta(

saldo > 5000

? `👑 Sim.

Estamos oficialmente
em território felino nobre.`

: `😿 Ainda não.

Mas já vi situações piores.`

);

break;

case 'sardinhas':

const saldoSardinha = obterSaldo();

const sardinhas =
Math.floor(
saldoSardinha / 5
);

digitarResposta(
`🐟 Seu saldo vale aproximadamente

${sardinhas} sardinhas.

Uma fortuna gastronômica.`
);

break;

case 'jogo':

digitarResposta(
`🎮 Posso.

Devo?

São perguntas diferentes.`
);

break;

case 'yuro':

digitarResposta(
`🐱 Sou o gerente não-oficial
do YuroBank.

Especialista em sardinhas
e decisões financeiras questionáveis.`
);

break;

case 'pagamento':

digitarResposta(
`🎣 Recebo em sardinhas,
elogios e depósitos ocasionais.`
);

break;

case 'trabalho':

digitarResposta(

respostasTrabalho[
Math.floor(
Math.random() *
respostasTrabalho.length
)
]

);

break;

case 'futuro':

digitarResposta(
`🔮 Minhas previsões indicam:

Menos gastos impulsivos.

Mais reservas.

E pelo menos uma compra
que você vai justificar depois.`
);

break;

}

}


let digitandoAtual;

function digitarResposta(texto){

  const resposta =
  document.getElementById(
    'resposta-yuhelp'
  );

  clearInterval(digitandoAtual);

  const pensamentos = [

    "🐱 Pensando",
    "🐟 Consultando sardinhas",
    "🏦 Verificando cofres",
    "😼 Analisando suas finanças"

  ];

  const pensamento =
  pensamentos[
    Math.floor(
      Math.random() *
      pensamentos.length
    )
  ];

  let pontos = 0;

  resposta.innerText = pensamento;

  const animacaoPensando =
  setInterval(() => {

    pontos++;

    if(pontos > 3){
      pontos = 0;
    }

    resposta.innerText =
      pensamento +
      ".".repeat(pontos);

  },300);

   const tempoPensando =
  Math.floor(
    Math.random() * 2000
  ) + 2500;

  setTimeout(() => {

    clearInterval(
      animacaoPensando
    );

    resposta.innerText = '';

    resposta.classList.remove(
      'aparecer'
    );

    void resposta.offsetWidth;

    resposta.classList.add(
      'aparecer'
    );

    let i = 0;

    digitandoAtual =
    setInterval(() => {

     resposta.textContent += texto.charAt(i);

      i++;

      if(i >= texto.length){

        clearInterval(
          digitandoAtual
        );

      }

    }, 28);

  }, tempoPensando);

}
            
//-----------------------------LOGIN FELINO----------------------//

document
.getElementById('btn-sair')
.addEventListener(
'click',
() => {

  localStorage.removeItem(
    'usuarioLogado'
  );

  window.location.href =
  'login.html';

});

const telaBoasVindas =
document.getElementById(
'boas-vindas-yuro'
);

const saldoBoasVindas =
document.getElementById(
'saldo-boas-vindas'
);

const usuario =
localStorage.getItem(
'usuarioYuro'
)
|| 'Cliente';

const saldoTexto =
localStorage.getItem('saldo')
|| 'R$ 1.250,75';

const saldoNumero =
parseFloat(
saldoTexto
.replace('R$ ','')
.replace('.','')
.replace(',','.')
);


let mensagensBoasVindas = [];

if(primeiraVisita){

mensagensBoasVindas = [

`🏦 YuroBank

🐱 Olá, ${usuario}.

Meu nome é Yuro.

──────── ✦ ────────

Entre cofres, moedas e muitas sardinhas financeiras,
minha missão é cuidar do que é importante para você.

🏦 Hoje não é apenas o início de uma conta.

É o início de uma nova jornada.

──────── ✦ ────────

💜 Obrigado por confiar no YuroBank.

Eu ficarei de olho nos cofres enquanto você constrói seus sonhos.

✨ Seja muito bem-vindo.`


];

}

else if(saldoNumero <= 100){

mensagensBoasVindas = [

`😿 Olá, ${usuario}.

Detectei níveis críticos
de sardinhas financeiras.

💰 Saldo atual:
${saldoTexto}`,

`🏦 Bem-vindo, ${usuario}.

Nosso sistema recomenda
evitar compras misteriosas hoje.

💰 Saldo atual:
${saldoTexto}`,

`🐾 Cofres verificados.

Resultado:
precisamos de mais moedas.

💰 Saldo atual:
${saldoTexto}`

];

}


// SALDO MÉDIO

else if(saldoNumero <= 5000){

mensagensBoasVindas = [

`🐱 Bom te ver novamente,
${usuario}.

Tudo segue organizado.

💰 Saldo atual:
${saldoTexto}`,

`🏦 Bem-vindo ao YuroBank,
${usuario}.

Seu patrimônio continua
sob vigilância felina.

💰 Saldo atual:
${saldoTexto}`,

`🐟 Olá, ${usuario}.

Nenhuma sardinha financeira
foi perdida hoje.

💰 Saldo atual:
${saldoTexto}`,

`😼 Que bom que voltou,
${usuario}.

Eu estava começando a
administrar tudo sozinho.

💰 Saldo atual:
${saldoTexto}`,

`💰 Seu saldo está saudável,
${usuario}.

Continue assim.

💰 Saldo atual:
${saldoTexto}`

];

}


// SALDO ALTO

else{

mensagensBoasVindas = [

`👑 Bem-vindo de volta,
${usuario}.

Detectei riqueza felina.

💰 Saldo atual:
${saldoTexto}`,

`🏦 Sistema carregado.

Patrimônio em excelente estado.

💰 Saldo atual:
${saldoTexto}`,

`😼 Olá, ${usuario}.

Os cofres estão felizes hoje.

💰 Saldo atual:
${saldoTexto}`,

`🐱 Conferi tudo duas vezes.

Seu dinheiro continua aqui.

💰 Saldo atual:
${saldoTexto}`,

`💎 Nível financeiro detectado:

Gato nobre.

💰 Saldo atual:
${saldoTexto}`

];

}

let mensagemAleatoria;

if(primeiraVisita){

mensagemAleatoria =
mensagensBoasVindas[0];

}
else{

mensagemAleatoria =
mensagensBoasVindas[
Math.floor(
Math.random() *
mensagensBoasVindas.length
)
];

}

saldoBoasVindas.innerText =
mensagemAleatoria;

const tempoBoasVindas =
primeiraVisita ? 22000 : 6000;

setTimeout(() => {

  telaBoasVindas.classList.add(
    'esconder'
  );

  if(primeiraVisita){

    localStorage.setItem(
      'jaVisitouYuro',
      'true'
    );

  }

}, tempoBoasVindas);