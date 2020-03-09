import 'p5';
import { preload, setup, draw } from './sketch';

let state = {}

/**
 * Lifecycle
 */

window.preload = preload

window.setup = () => {
  setup(state)
}

window.draw = () => {
  draw(state)
}