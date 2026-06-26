function gerarDataHora() {

  const agora = new Date();

  return agora.toLocaleString('pt-BR');

}

function mostrarToast(mensagem) {

  const toast =
  document.getElementById(
    'toast-sucesso'
  );

  toast.innerHTML = mensagem;

  toast.classList.add(
    'mostrar'
  );

  setTimeout(() => {

    toast.classList.remove(
      'mostrar'
    );

  }, 3000);

}