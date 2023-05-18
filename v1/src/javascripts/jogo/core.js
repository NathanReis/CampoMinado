let campo = [];
let posicoesBombas = [];
let posicoesBandeiras = [];
let posicoesAbertas = [];
let ehJogoFinalizado = false;
let ehVitoria = null;

function abrirPosicao({ posicao, exibirLog, exibirCampo }) {
  if (ehJogoFinalizado) {
    return verificarVitoria({ exibirLog });
  };

  if (!ehPosicaoNoCampo(posicao)) {
    return exibirLog('Posições escolhidas não estão no campo!');
  }

  if (ehPosicaoAberta(posicao)) {
    return exibirLog('Posição já aberta, escolhe uma diferente!');
  }

  if (ehPosicaoDeBomba(posicao)) {
    ehJogoFinalizado = true;
    ehVitoria = false;
    posicoesAbertas.push(posicao);

    exibirCampo(desenharCampo());

    return exibirLog('Você perdeu! 💥');
  }

  posicoesAbertas.push(posicao);

  removerPosicaoDeBandeira(posicao);

  if (!ehPosicaoDica(posicao)) {
    propagarAbertura(posicao);
  }

  exibirCampo(desenharCampo());
  verificarVitoria({ exibirLog });
}

function propagarAbertura(posicaoAberta) {
  let posicoesEmTorno = [
    [-1, -1], [-1,  0], [-1, +1], // 1 1 1
    [ 0, -1],           [ 0, +1], // 1 B 1
    [+1, -1], [+1,  0], [+1, +1], // 1 1 1
  ];
  let [abertaX, abertaY] = posicaoAberta;

  for (let [emTornoX, emTornoY] of posicoesEmTorno) {
    let posicao = [(abertaX + emTornoX), (abertaY + emTornoY)];

    if (
      ehPosicaoNoCampo(posicao)
      && !ehPosicaoAberta(posicao)
      && !ehPosicaoDeBomba(posicao)
    ) {
      posicoesAbertas.push(posicao);

      removerPosicaoDeBandeira(posicao);

      if (!ehPosicaoDica(posicao)) {
        propagarAbertura(posicao);
      }
    }
  }
}

function removerPosicaoDeBandeira(posicao) {
  if (ehPosicaoDeBandeira(posicao)) {
    posicoesBandeiras = posicoesBandeiras.filter((posicaoBandeira) => {
      return !saoArraysIguais(posicao, posicaoBandeira);
    });
  }
}

function marcarComBandeira({ posicao, exibirLog, exibirCampo }) {
  if (ehJogoFinalizado) {
    return verificarVitoria({ exibirLog });
  };

  if (!ehPosicaoNoCampo(posicao)) {
    return exibirLog('Posições escolhidas não estão no campo!');
  }

  if (ehPosicaoAberta(posicao)) {
    return exibirLog('Posição já aberta, escolhe uma diferente!');
  }

  if (ehPosicaoDeBandeira(posicao)) {
    return exibirLog('Posição já marcada, escolhe uma diferente!');
  }

  posicoesBandeiras.push(posicao);

  exibirCampo(desenharCampo());
  verificarVitoria({ exibirLog });
}

function verificarVitoria({ exibirLog }) {
  if (ehJogoFinalizado) {
    return exibirLog(`Você ${ehVitoria ? 'venceu! 😄' : 'perdeu! 💥'}`)
  }

  let totalDePosicoes = SETTINGS.campo.tamanhoX * SETTINGS.campo.tamanhoY;
  let totalDePosicoesDescobertasParaVitoria = totalDePosicoes - SETTINGS.bombas.quantidade;

  let faltaApenasBombas = posicoesAbertas.length === totalDePosicoesDescobertasParaVitoria;

  if (faltaApenasBombas) {
    ehJogoFinalizado = true;
    ehVitoria = true;

    exibirLog('Você venceu! 😄');
  }
}

function reiniciar({ exibirCampo }) {
  campo = [];
  posicoesBombas = [];
  posicoesBandeiras = [];
  posicoesAbertas = [];
  ehJogoFinalizado = false;
  ehVitoria = null;

  inicializar({ exibirCampo });
}

function inicializar({ exibirCampo }) {
  inicializarCampo();
  sortearPosicoesDasBombas();
  colocarBombasNoCampo();
  colocarDicasNoCampo();
  exibirCampo(desenharCampo());
}

function inicializarCampo() {
  for (let x = 0; x < SETTINGS.campo.tamanhoX; x++) {
    campo[x] = [];

    for (let y = 0; y < SETTINGS.campo.tamanhoY; y++) {
      campo[x][y] = 0;
    }
  }
}

function sortearPosicoesDasBombas() {
  for (let i = 0; i < SETTINGS.bombas.quantidade;) {
    let possivelPosicao = sortearPosicaoNoCampo();

    if (!ehPosicaoDeBomba(possivelPosicao)) {
      posicoesBombas[i] = possivelPosicao;
      i++;
    }
  }
}

function colocarBombasNoCampo() {
  for (let [x, y] of posicoesBombas) {
    campo[x][y] = SETTINGS.bombas.simbolo;
  }
}

function colocarDicasNoCampo() {
  let posicoesDicas = [
    [-1, -1], [-1,  0], [-1, +1], // 1 1 1
    [ 0, -1],           [ 0, +1], // 1 B 1
    [+1, -1], [+1,  0], [+1, +1], // 1 1 1
  ];

  for (let [bombaX, bombaY] of posicoesBombas) {
    for (let [dicaX, dicaY] of posicoesDicas) {
      let x = bombaX + dicaX;
      let y = bombaY + dicaY;

      if (ehPosicaoNoCampo([x, y]) && !ehPosicaoDeBomba([x, y])) {
        campo[x][y]++;
      }
    }
  }
}

function desenharCampo() {
  let desenhoCampo = '';

  for (let y = 0; y <= SETTINGS.campo.tamanhoY; y++) {
    desenhoCampo += `${SETTINGS.campo.simbolos[y]}|`;
  }

  desenhoCampo += '\n\r';

  for (let x = 0; x < SETTINGS.campo.tamanhoX; x++) {
    desenhoCampo += `${SETTINGS.campo.simbolos[(x + 1)]}|`;

    for (let y = 0; y < SETTINGS.campo.tamanhoY; y++) {
      let posicao = [x, y];

      if (ehPosicaoAberta(posicao)) {
        if (ehPosicaoDeBomba(posicao)) {
          desenhoCampo += SETTINGS.bombas.simbolo;
        }
        else if (ehPosicaoDica(posicao)) {
          let dica = campo[x][y];

          desenhoCampo += SETTINGS.campo.simbolos[dica];
        } else {
          desenhoCampo += SETTINGS.campo.simbolos.aberto;
        }
      } else if (ehPosicaoDeBandeira(posicao)) {
        desenhoCampo += SETTINGS.bandeiras.simbolo;
      } else {
        desenhoCampo += SETTINGS.campo.simbolos.fechado;
      }

      desenhoCampo += '|';
    }

    desenhoCampo += '\n\r';
  }

  return desenhoCampo;
}

function sortearPosicaoNoCampo() {
  return [
    Math.floor(Math.random() * SETTINGS.campo.tamanhoX),
    Math.floor(Math.random() * SETTINGS.campo.tamanhoY)
  ];
}

function ehPosicaoDeBomba(posicao) {
  return posicoesBombas.some((posicaoBomba) => {
    return saoArraysIguais(posicaoBomba, posicao);
  });
}

function ehPosicaoNoCampo(posicao) {
  let [x, y] = posicao;

  return ehLinhaNoCampo(x) && ehColunaNoCampo(y);
}

function ehPosicaoAberta(posicao) {
  return posicoesAbertas.some((posicaoAberta) => {
    return saoArraysIguais(posicaoAberta, posicao);
  });
}

function ehPosicaoDica(posicao) {
  let [x, y] = posicao;

  return (
    campo[x][y] !== 0
    && campo[x][y] !== SETTINGS.bombas.simbolo
    && campo[x][y] !== SETTINGS.bandeiras.simbolo
  );
}

function ehPosicaoDeBandeira(posicao) {
  return posicoesBandeiras.some((posicaoBandeira) => {
    return saoArraysIguais(posicaoBandeira, posicao);
  });
}

function saoArraysIguais(array1, array2) {
  return array1.toString() === array2.toString();
}

function ehLinhaNoCampo(x) {
  return x >= 0 && x < SETTINGS.campo.tamanhoX;
}

function ehColunaNoCampo(y) {
  return y >= 0 && y < SETTINGS.campo.tamanhoY;
}
