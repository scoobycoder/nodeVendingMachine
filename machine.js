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
    const itemPrice = values(price[PRICE_VALUE_LOC])[PRICE_VALUE_LOC]
    console.log(`itemPrice: ${itemPrice}`)
    return itemPrice
}

export const itemTray = () => items

export const coinReturn = () => {
    const localCoin = coins
    clearCoins()
    return localCoin 
}

export const makeChange = (someItem) => {
    const amountInserted = checkMoney()
    console.log(`amountInserted: ${amountInserted}`)
    const change = amountInserted - priceItem(someItem)
    console.log(`change: ${change}`)
    return change
}

const checkMoney = () => coins.reduce((total, value) => total + values(value)[COIN_VALUE_LOC], 0)

const purchaseCandy = () => {
    checkMoney()
    items.push({"type": "candy"})
    return makeChange({"type": "candy"})
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  priceItem({"type": "candy"}) <= checkMoney() ? items.push({"type": "chips"}) : console.log("MO Money!")
export const candy = () =>  {
    return priceItem({"type": "candy"}) <= checkMoney() ?  purchaseCandy() : console.log("MO Money!")
}