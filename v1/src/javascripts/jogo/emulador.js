const MODO_EMULADOR = Object.freeze({
  inicializar: function () {
    inicializar({
      exibirCampo: exibirCampoEmulador,
    });
  },

  // Recebe as coordenadas com base na indicação do campo, ou seja, os valores
  // vão de 1 à 10, e não de 0 à 9.
  abrirPosicao: function (usuarioX, usuarioY) {
    let posicao = [(usuarioX - 1), (usuarioY - 1)];

    abrirPosicao({
      posicao,
      exibirLog: exibirLogEmulador,
      exibirCampo: exibirCampoEmulador,
    });
  },

  // Recebe as coordenadas com base na indicação do campo, ou seja, os valores
  // vão de 1 à 10, e não de 0 à 9.
  marcarComBandeira: function (usuarioX, usuarioY) {
    let posicao = [(usuarioX - 1), (usuarioY - 1)];

    marcarComBandeira({
      posicao,
      exibirLog: exibirLogEmulador,
      exibirCampo: exibirCampoEmulador,
    });
  },

  reiniciar: function () {
    reiniciar({
      exibirCampo: exibirCampoEmulador,
    });
  },
});

function exibirCampoEmulador(desenhoCampo) {
  document.querySelector('#campo').innerHTML = desenhoCampo;
  exibirLogEmulador('');
}

function exibirLogEmulador(mensagem) {
  document.querySelector('#log').innerHTML = mensagem;
}
