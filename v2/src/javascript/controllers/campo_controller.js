import { jogo, reiniciar as reiniciarJogo } from '../jogo.js';
import { SETTINGS } from '../settings.js';
import { Controller } from '../stimulus.js';

class CampoController extends Controller {
  static targets = ['campo']

  connect() {
    this.inicializar();
  }

  reiniciar() {
    reiniciarJogo();

    document.querySelector('#log').innerHTML = '';

    while (this.campoTarget.firstChild) {
      this.campoTarget.removeChild(this.campoTarget.firstChild);
    }

    this.inicializar();
  }

  inicializar() {
    this.construirCampo();
    this.colocarBombasNoCampo();
    this.colocarDicasNoCampo();
  }

  construirCampo() {
    for (let x = 0; x < SETTINGS.campo.linhas; x++) {
      let linha = this.construirLinha();
      linha.dataset.linha = x;

      for (let y = 0; y < SETTINGS.campo.colunas; y++) {
        let coluna = this.construirColuna();
        coluna.dataset.coluna = y;

        linha.appendChild(coluna);
      }

      this.campoTarget.appendChild(linha);
    }
  }

  colocarBombasNoCampo() {
    let linhas = document.querySelectorAll('.linha');

    for (let [x, y] of jogo.posicoesBombas) {
      let coluna = linhas[x].querySelectorAll('.coluna')[y];
      coluna.dataset.ehBomba = true;
    }
  }

  colocarDicasNoCampo() {
    let posicoesDicas = [
      [-1, -1], [-1,  0], [-1, +1], // 1 1 1
      [ 0, -1],           [ 0, +1], // 1 B 1
      [+1, -1], [+1,  0], [+1, +1], // 1 1 1
    ];

    for (let [bombaX, bombaY] of jogo.posicoesBombas) {
      for (let [dicaX, dicaY] of posicoesDicas) {
        let x = bombaX + dicaX;
        let y = bombaY + dicaY;

        if (jogo.ehPosicaoNoCampo([x, y]) && !jogo.ehPosicaoDeBomba([x, y])) {
          let coluna = document.querySelector(`.linha[data-linha="${x}"] .coluna[data-coluna="${y}"]`);
          coluna.dataset.dica = Number(coluna.dataset.dica || '0') + 1;
        }
      }
    }
  }

  construirLinha() {
    let linha = document.createElement('div');
    linha.classList.add('linha');

    return linha;
  }

  construirColuna() {
    let coluna = document.createElement('div');
    coluna.classList.add('coluna');
    coluna.dataset.controller = 'campo-posicao';
    coluna.dataset.action = 'click->campo-posicao#abrir contextmenu->campo-posicao#marcarBandeira';

    return coluna;
  }
}

export { CampoController };
