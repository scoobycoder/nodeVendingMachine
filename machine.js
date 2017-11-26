import { values, keys } from 'lodash'

let coins = []
let items = []
const prices = [{"candy": 50}, {"chips": 75}]
const coinTypes = [{type: 'quarter', value: 25}, {type: 'dime', 'value': 10}]
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

const findCoin = (coinToFind) => coin === coinToFind

const makeChange = (someItem) => { 
    const remainingAmount = checkMoney() - priceItem(someItem)
    clearCoins()
    const coinToInsert = coinTypes.filter((coin) => JSON.stringify(values(coin)[1]) == remainingAmount)
    coins.push(coinToInsert[0])
    return remainingAmount
}
const checkMoney = () => coins.reduce((total, value) => total + values(value)[COIN_VALUE_LOC], 0)

const purchaseCandy = () => {
    checkMoney()
    items.push({"type": "candy"})
    return makeChange({"type": "candy"})
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  priceItem({"type": "candy"}) <= checkMoney() ? items.push({"type": "chips"}) : console.log("MO Money!")
export const candy = () =>  priceItem({"type": "candy"}) <= checkMoney() ?  purchaseCandy() : console.log("MO Money!")