const btnCadastro =
document.getElementById(
'btn-cadastro'
);

const btnLogin =
document.getElementById(
'btn-login'
);

const mensagem =
document.getElementById(
'mensagem'
);


btnCadastro.addEventListener(
'click',
function(){

const usuario =
document.getElementById(
'usuario'
).value;

const senha =
document.getElementById(
'senha'
).value;

if(
usuario === '' ||
senha === ''
){

mensagem.innerText =
'Preencha tudo.';

return;

}

localStorage.setItem(
'usuarioYuro',
usuario
);

localStorage.setItem(
'senhaYuro',
senha
);

mensagem.innerText =
'Conta criada com sucesso!';

localStorage.setItem(
'jaVisitouYuro',
'false'
);

localStorage.setItem(
'saldo',
'R$ 1.250,75'   
);

localStorage.setItem(
'limite',
'0'
);

});


btnLogin.addEventListener(
'click',
function(){

const usuario =
document.getElementById(
'usuario'
).value;

const senha =
document.getElementById(
'senha'
).value;

const usuarioSalvo =
localStorage.getItem(
'usuarioYuro'
);

const senhaSalva =
localStorage.getItem(
'senhaYuro'
);

if(
usuario === usuarioSalvo &&
senha === senhaSalva
){

localStorage.setItem(
'usuarioLogado',
'true'
);

window.location.href =
'index.html';

}
else{

mensagem.innerText =
'Usuário ou senha incorretos.';

}

});

const jaVisitou =
localStorage.getItem(
'jaVisitouYuro'
) === 'true';


const subtitulo =
document.getElementById(
'subtitulo-login'
);

const usuarioSalvo =
localStorage.getItem(
'usuarioYuro'
);

if(
jaVisitou &&
usuarioSalvo
){

subtitulo.innerText =
`Bem-vindo(a) de volta, ${usuarioSalvo}`;

}
else{

subtitulo.innerText =
'Primeira visita? Conheça o YuroBank.';

}

const video =
document.getElementById(
'video-fundo'
);

video.play()
.catch(erro => {

console.log(
'Erro vídeo:',
erro
);

});
