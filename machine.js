var heldCoins;

function coinHolder(coins) {
  heldCoins = Object.assign({}, coins);
}

function coinReturn() {
  return heldCoins;
}

function vend() {
  return true;
}

module.exports = {
    coinHolder,
    vend,
    coinReturn
}
