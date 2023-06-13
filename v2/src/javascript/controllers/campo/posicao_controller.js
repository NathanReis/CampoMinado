import { jogo } from '../../jogo.js';
import { SETTINGS } from '../../settings.js';
import { Controller } from '../../stimulus.js';

class PosicaoController extends Controller {
  abrir() {
    if (jogo.ehJogoFinalizado) return;

    this._abrir(this.element);

    let posicao = [
      Number(this.element.parentNode.dataset.linha),
      Number(this.element.dataset.coluna),
    ];

    if (!this.element.dataset.simbolo) {
      this.propagarAbertura(posicao);
    }
  }

  _abrir(elemento) {
    if (Boolean(elemento.dataset.ehBomba)) {
      elemento.dataset.simbolo = SETTINGS.bombas.simbolo;
    } else if (elemento.dataset.dica) {
      elemento.dataset.simbolo = elemento.dataset.dica;
    } else {
      elemento.dataset.simbolo = '';
    }

    delete elemento.dataset.controller;
    delete elemento.dataset.action;

    elemento.classList.add('aberta');

    let posicao = [
      Number(elemento.parentNode.dataset.linha),
      Number(elemento.dataset.coluna),
    ];

    jogo.abrirPosicao({ posicao, exibirLog: this.exibirLog });
  }

  propagarAbertura(posicaoAberta) {
    let posicoesEmTorno = [
      [-1, -1], [-1,  0], [-1, +1], // 1 1 1
      [ 0, -1],           [ 0, +1], // 1   1
      [+1, -1], [+1,  0], [+1, +1], // 1 1 1
    ];
    let [abertaX, abertaY] = posicaoAberta;

    for (let [emTornoX, emTornoY] of posicoesEmTorno) {
      let posicao = [(abertaX + emTornoX), (abertaY + emTornoY)];
      let [x, y] = posicao;

      let elementoEmTorno = document.querySelector(`.linha[data-linha="${x}"] .coluna[data-coluna="${y}"]`);

      if (
        elementoEmTorno
        && !elementoEmTorno.classList.contains('aberta')
        && !Boolean(elementoEmTorno.dataset.ehBomba)
      ) {
        this._abrir(elementoEmTorno);

        if (!elementoEmTorno.dataset.dica) {
          this.propagarAbertura(posicao);
        }
      }
    }
  }

  marcarBandeira(event) {
    event.preventDefault();

    if (jogo.ehJogoFinalizado) return;

    this.element.dataset.simbolo = SETTINGS.bandeiras.simbolo;
  }

  exibirLog(mensagem) {
    document.querySelector('#log').innerHTML = mensagem;
  }
}

export { PosicaoController };
