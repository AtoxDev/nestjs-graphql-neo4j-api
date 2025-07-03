/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function() {
  // Configuración global para los tests
  console.log('\nSetting up tests...\n');

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};

