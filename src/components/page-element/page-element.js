import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, customElement} from 'lit/decorators.js';

import template from './page-element.html';
import styles from './page-element.css?inline';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('page-element')
export class PageElement extends LitElement {
  @property({ type: String })
  docsHint = 'Click on the Vite and Lit logos to learn more';

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

}
