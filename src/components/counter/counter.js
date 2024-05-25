import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, customElement} from 'lit/decorators.js';

import template from './counter.html';
import styles from './counter.css?inline';
import { debounce } from '../../utils/debounce';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('counter-element')
export class CounterElement extends LitElement {
  @property({ type: Number })
  count = 3;

  static get styles() {
    return css`
    ${unsafeCSS(styles)}
    `;
  }

  get template() {
    return template.call(this);
  }

  render() {
    return html` ${this.template} `;
  }

  @debounce(200)
  _onClick() {
    this.count++;
  }
}
