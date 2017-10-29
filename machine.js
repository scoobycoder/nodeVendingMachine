let coins = []

const clearCoins = () => coins = []

export const coinReturn = () => {
    const localCoin = coins
    clearCoins()
    return localCoin 
}

export const insertCoin = (coin) => coins.push(coin)

export default () => true