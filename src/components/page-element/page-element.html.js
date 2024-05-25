import { html } from 'lit';
import viteLogo from '/vite.svg';
import litLogo from '@/assets/lit.svg';
import '@/components/counter/counter';

export default function () {
  return html`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src=${viteLogo} class="logo" alt="Vite logo" />
    </a>
    <a href="https://lit.dev" target="_blank">
      <img src=${litLogo} class="logo lit" alt="Lit logo" />
    </a>
  </div>
  <slot></slot>
  <counter-element></counter-element>
  <p class="read-the-docs">${this.docsHint}</p>
`;
}
