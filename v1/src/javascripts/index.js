document.addEventListener('DOMContentLoaded', function(e) {
  MODO_CONSOLE.inicializar();
  MODO_EMULADOR.inicializar();

  document.querySelector('#abrir-emulador-console').addEventListener('click', () => {
    document.querySelector('#emulador-console').showModal();
  });

  document.querySelector('#fechar-emulador-console').addEventListener('click', () => {
    document.querySelector('#emulador-console').close();
  });

  document.querySelector('#abrir-posicao').addEventListener('click', () => {
    let usuarioX = document.querySelector('#posicao-x').value;
    let usuarioY = document.querySelector('#posicao-y').value;

    MODO_EMULADOR.abrirPosicao(usuarioX, usuarioY);

    document.querySelector('#posicao-x').value = '';
    document.querySelector('#posicao-y').value = '';
  });

  document.querySelector('#marcar-bomba').addEventListener('click', () => {
    let usuarioX = document.querySelector('#posicao-x').value;
    let usuarioY = document.querySelector('#posicao-y').value;

    MODO_EMULADOR.marcarComBandeira(usuarioX, usuarioY);

    document.querySelector('#posicao-x').value = '';
    document.querySelector('#posicao-y').value = '';
  });

  document.querySelector('#reiniciar').addEventListener('click', () => {
    MODO_EMULADOR.reiniciar();

    document.querySelector('#posicao-x').value = '';
    document.querySelector('#posicao-y').value = '';
  });
});
