import { values, keys } from 'lodash'

let coins = []
let items = []
const prices = [{"candy": 50}, {"chips": 75}]
const clearCoins = () => coins = []
const COIN_VALUE_LOC = 1
const PRICE_VALUE_LOC = 0

export const resetMachine = () => {
    clearCoins()
    items = []
}

const priceItem = (item) => {
    const price = prices.filter((priceItem) => keys(priceItem)[0] == values(item)[0])
    return values(price[PRICE_VALUE_LOC])[PRICE_VALUE_LOC]
}

export const itemTray = () => items

export const coinReturn = () => {
    const localCoin = coins
    clearCoins()
    return localCoin 
}

const checkMoney = () => coins.reduce((total, value) => total + values(value)[COIN_VALUE_LOC], 0)

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  priceItem({"type": "candy"}) <= checkMoney() ? items.push({"type": "chips"}) : console.log("MO Money!")
export const candy = () =>  priceItem({"type": "candy"}) <= checkMoney() ? items.push({"type": "candy"}) : console.log("MO Money!")