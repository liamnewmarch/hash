'use strict';

function Storage() {
  const storage = window.localStorage || {};

  function get(key, defaultValue) {
    return storage[key] || defaultValue;
  }

  function set(key, value) {
    return storage[key] = value;
  }

  return { get, set };
}


Crypto.$inject = ['Storage'];
function Crypto(Storage) {
  const crypto = window.CryptoJS;
  const algorithms = ['SHA512', 'SHA256', 'SHA1', 'MD5'];

  function get() {
    const defaultValue = algorithms[0];
    return Storage.get('algorithm', defaultValue);
  }

  function hash(input) {
    if (!input.length) return '';
    const key = get();
    const algorithm = crypto[key];
    return algorithm(input);
  }

  function set(algorithm) {
    Storage.set('algorithm', algorithm);
    return crypto[algorithm];
  }

	return { algorithms, get, hash, set };
}


InputCtrl.$inject = ['Crypto'];
function InputCtrl(Crypto) {
  const vm = this;

  const update = () => {
    vm.crypto.set(vm.algorithm);
    vm.output = Crypto.hash(vm.input);
  }

  angular.extend(this, {
    algorithm: Crypto.get(),
    crypto: Crypto,
    update: update
  });
}


angular.module('hashApp', [])
  .service(Storage.name, Storage)
  .service(Crypto.name, Crypto)
  .controller(InputCtrl.name, InputCtrl);
