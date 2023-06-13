import { PosicaoController } from './controllers/campo/posicao_controller.js';
import { CampoController } from './controllers/campo_controller.js';
import { Application } from './stimulus.js';

window.Stimulus = Application.start();

Stimulus.register('campo', CampoController);
Stimulus.register('campo-posicao', PosicaoController);
