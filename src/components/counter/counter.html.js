import { html } from 'lit';

export default function () {
  return html`
  <div class="card">
    <button @click=${this._onClick} part="button">
      count is ${this.count}
    </button>
  </div>
`;
}
