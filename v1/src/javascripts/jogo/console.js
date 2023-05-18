const MODO_CONSOLE = Object.freeze({
  inicializar: function () {
    inicializar({
      exibirCampo: exibirCampoConsole,
    });
  },

  // Recebe as coordenadas com base na indicação do campo, ou seja, os valores
  // vão de 1 à 10, e não de 0 à 9.
  abrirPosicao: function (usuarioX, usuarioY) {
    let posicao = [(usuarioX - 1), (usuarioY - 1)];

    abrirPosicao({
      posicao,
      exibirLog: exibirLogConsole,
      exibirCampo: exibirCampoConsole,
    });
  },

  // Recebe as coordenadas com base na indicação do campo, ou seja, os valores
  // vão de 1 à 10, e não de 0 à 9.
  marcarComBandeira: function (usuarioX, usuarioY) {
    let posicao = [(usuarioX - 1), (usuarioY - 1)];

    marcarComBandeira({
      posicao,
      exibirLog: exibirLogConsole,
      exibirCampo: exibirCampoConsole,
    });
  },

  reiniciar: function () {
    reiniciar({
      exibirCampo: exibirCampoConsole,
    });
  },
});

function exibirCampoConsole(desenhoCampo) {
  console.log(desenhoCampo);
}

function exibirLogConsole(mensagem) {
  console.log(mensagem);
}
