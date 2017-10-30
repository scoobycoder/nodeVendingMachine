let coins = []

const clearCoins = () => coins = []

export const coinReturn = () => {
    const localCoin = coins
    clearCoins()
    return localCoin 
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)

export default () => true