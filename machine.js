import { values, keys } from 'lodash'

let coins = []
let items = []
const prices = [{"candy": 50}, {"chips": 75}]
const clearCoins = () => coins = []

export const resetMachine = () => {
    clearCoins()
    items = []
}

export const pricer = (item) => {
    const price = prices.filter((priceItem) => keys(priceItem)[0] == values(item)[0])
    return values(price[0])[0]
}

export const itemTray = () => items

export const coinReturn = () => {
    const localCoin = coins
    clearCoins()
    return localCoin 
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  items.push({"type": "chips"})
export const candy = () =>  items.push({"type": "candy"})

export default () => true