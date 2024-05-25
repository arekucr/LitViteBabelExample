import { LitElement, html } from 'lit';
import { customElement} from 'lit/decorators.js';

//import {  } from 'lit/decorators.js';
import '@/components/page-element/page-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-element')
export class AppElement extends LitElement {
  get template() {
    return template.call(this);
  }

  render() {
    return html`<style>
        :host {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
        }
    </style>
    <page-element>
        <h1>Vite + Lit</h1>
    </page-element>`;
  }

}
