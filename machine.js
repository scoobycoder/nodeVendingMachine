import { values, keys } from 'lodash'

let coins = []
let items = []
let inventory = []
const prices = [{"candy": 50}, {"chips": 75}]
const coinTypes = [{type: 'quarter', value: 25}, {type: 'dime', 'value': 10}]
const clearCoins = () => coins = []
const COIN_VALUE_LOC = 1
const PRICE_VALUE_LOC = 0
const ARRAY_VALUE = 0

export const resetMachine = () => {
    inventory = [{"candy": 2}, {"chips": 2}]
    clearCoins()
    items = []
}

const priceItem = (item) => {
    const price = prices.filter((x) => keys(x)[0] == values(item)[0])
    return values(price[PRICE_VALUE_LOC])[PRICE_VALUE_LOC]
}

const checkInventory = (item) => inventory.filter((x) => keys(x)[ARRAY_VALUE] == item)[ARRAY_VALUE][item] > 0
    
export const itemTray = () => items

export const coinReturn = () => {
    const localCoin = coins
    clearCoins()
    return localCoin 
}

const updateCoins = (remainingAmount) => {
    const coinToInsert = coinTypes.filter((coin) => JSON.stringify(values(coin)[COIN_VALUE_LOC]) == remainingAmount)
    coinToInsert[ARRAY_VALUE] != null ? coins.push(coinToInsert[ARRAY_VALUE]) : console.log('No Change') 
}

const makeChange = (someItem) => { 
    const remainingAmount = checkMoney() - priceItem(someItem)
    clearCoins()
    updateCoins(remainingAmount)
    return remainingAmount
}

const checkMoney = () => coins.reduce((total, value) => total + values(value)[COIN_VALUE_LOC], 0)

const purchaseItem = (item) => {
    checkMoney()
    items.push(item)
    return makeChange(item)
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  priceItem({"type": "chips"}) <= checkMoney() ? purchaseItem({"type": "chips"}) : console.log("MO Money!")
export const candy = () =>  (priceItem({"type": "candy"}) <= checkMoney() && checkInventory("candy")) ?  purchaseItem({"type": "candy"}) : console.log("MO Money!")