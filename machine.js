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

const deductMoney = () => {
    const indexOfCoin = values(coins[0])[0]
    console.log(`coins: ${coins}`)
    console.log(`indexOfCoin: ${indexOfCoin}`)
    const index = coins.findIndex(i => i.type === "quarter")
    // const index = coins.indexOf(indexOfCoin)
    console.log(`index: ${index}`)
    if (index > -1) {
        coins.splice(index, 1);
    }
}

const checkMoney = () => coins.reduce((total, value) => total + values(value)[COIN_VALUE_LOC], 0)

const purchaseCandy = () => {
    checkMoney()
    deductMoney()
    deductMoney()
    items.push({"type": "candy"})
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  priceItem({"type": "candy"}) <= checkMoney() ? items.push({"type": "chips"}) : console.log("MO Money!")
export const candy = () =>  {
    return priceItem({"type": "candy"}) <= checkMoney() ?  purchaseCandy() : console.log("MO Money!")
}