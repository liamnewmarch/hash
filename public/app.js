class Crypto {
  get algorithm() {
    return localStorage.getItem('algorithm') || Crypto.algorithms[0];
  }

  set algorithm(algorithm) {
    if (!Crypto.algorithms.includes(algorithm)) {
      throw new Error(`Invalid algorithm ${algorithm}`);
    }

    localStorage.setItem('algorithm', algorithm);
  }

  async encode(string) {
    if (!string) return '';
    const text = new TextEncoder('utf-8').encode(string);
    const buffer = await crypto.subtle.digest(this.algorithm, text);
    return new Uint8Array(buffer).reduce((str, value) => {
      return str + value.toString(16).padStart(2, 0);
    }, '');
  }
}

Crypto.algorithms = ['SHA-512', 'SHA-384', 'SHA-256', 'SHA-1'];


class Controller extends HTMLElement {
  constructor() {
    super();
    this.crypto = new Crypto();
    this.oninput = this.oninput.bind(this);
  }

  connectedCallback() {
    this.form = this.querySelector('form');
    this.input = this.querySelector('input[name="input"]');
    this.output = this.querySelector('input[name="output"]');
    this.select = this.querySelector('select');

    for (const algorithm of Crypto.algorithms) {
      const option = document.createElement('option');
      option.textContent = algorithm;
      option.value = algorithm;
      this.select.append(option);
    }

    this.select.value = this.crypto.algorithm;

    this.form.addEventListener('input', this.oninput);
  }

  disconnectedCallback() {
    this.form.removeEventListener('input', this.oninput);
    this.select.innerHTML = '';
  }

  async oninput(event) {
    event.preventDefault();
    this.crypto.algorithm = this.select.value;
    this.output.value = await this.crypto.encode(this.input.value);
  }
}

customElements.define('app-controller', Controller);

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js').then((registration) => {
    registration.update();
  });
}
