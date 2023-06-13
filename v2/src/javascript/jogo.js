import { SETTINGS } from './settings.js';

class Jogo {
  posicoesBombas = [];
  posicoesAbertas = [];
  ehJogoFinalizado = null;
  ehVitoria = null;

  constructor() {
    this.sortearPosicoesDasBombas();
  }

  sortearPosicoesDasBombas() {
    for (let i = 0; i < SETTINGS.bombas.quantidade;) {
      let possivelPosicao = this.sortearPosicaoNoCampo();

      if (!this.ehPosicaoDeBomba(possivelPosicao)) {
        this.posicoesBombas[i] = possivelPosicao;
        i++;
      }
    }
  }

  sortearPosicaoNoCampo() {
    return [
      Math.floor(Math.random() * SETTINGS.campo.linhas),
      Math.floor(Math.random() * SETTINGS.campo.colunas)
    ];
  }

  abrirPosicao({ posicao, exibirLog }) {
    if (this.ehJogoFinalizado) {
      return this.verificarVitoria({ exibirLog });
    };

    if (this.ehPosicaoDeBomba(posicao)) {
      this.ehJogoFinalizado = true;
      this.ehVitoria = false;
      this.posicoesAbertas.push(posicao);

      return exibirLog('Você perdeu! 💥');
    }

    this.posicoesAbertas.push(posicao);

    this.verificarVitoria({ exibirLog });
  }

  ehPosicaoDeBomba(posicao) {
    return this.posicoesBombas.some((posicaoBomba) => {
      return this.saoArraysIguais(posicaoBomba, posicao);
    });
  }

  verificarVitoria({ exibirLog }) {
    if (this.ehJogoFinalizado) {
      return exibirLog(`Você ${this.ehVitoria ? 'venceu! 😄' : 'perdeu! 💥'}`)
    }

    let totalDePosicoes = SETTINGS.campo.linhas * SETTINGS.campo.colunas;
    let totalDePosicoesDescobertasParaVitoria = totalDePosicoes - SETTINGS.bombas.quantidade;

    let faltaApenasBombas = this.posicoesAbertas.length === totalDePosicoesDescobertasParaVitoria;

    if (faltaApenasBombas) {
      this.ehJogoFinalizado = true;
      this.ehVitoria = true;

      exibirLog('Você venceu! 😄');
    }
  }

  ehPosicaoNoCampo(posicao) {
    let [x, y] = posicao;

    return this.ehLinhaNoCampo(x) && this.ehColunaNoCampo(y);
  }

  saoArraysIguais(array1, array2) {
    return array1.toString() === array2.toString();
  }

  ehLinhaNoCampo(x) {
    return x >= 0 && x < SETTINGS.campo.linhas;
  }

  ehColunaNoCampo(y) {
    return y >= 0 && y < SETTINGS.campo.colunas;
  }
}

function reiniciar() {
  jogo = new Jogo();
}

let jogo = new Jogo();

export {
  jogo,
  reiniciar,
};
