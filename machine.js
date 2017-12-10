import { values, keys, find, merge, chain } from 'lodash'

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

const checkInventory = (item) => {
    const locInventory = find(inventory, (o) => o[item] >= 1)
    return locInventory !== undefined ? locInventory[item] : 0
}
    
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

const removeInventory = (item) => {
    const itemType = values(item)
    let loc_items = []
    const remainingItems = checkInventory(itemType) - 1
    let candyRemaining = find(inventory, (o) => o.candy > 1)
    let chipsRemaining = find(inventory, (o) => o.chips > 1)
    candyRemaining = merge(candyRemaining, {"candy": remainingItems})
    chipsRemaining = merge(candyRemaining, {"chips": remainingItems})
    loc_items.push(candyRemaining)
    loc_items.push(chipsRemaining)
    inventory = loc_items
} 

const checkMoney = () => coins.reduce((total, value) => total + values(value)[COIN_VALUE_LOC], 0)

const purchaseItem = (item) => {
    checkMoney()
    items.push(item)
    removeInventory(item)
    return makeChange(item)
}

export const insertCoin = (coin) => coin['type'] === 'penny' ? console.log('No Pennies!') : coins.push(coin)
export const chips = () =>  (priceItem({"type": "chips"}) <= checkMoney() && checkInventory("chips") > 0) ?  purchaseItem({"type": "chips"}) : console.log("Invalid Purchase")
export const candy = () =>  (priceItem({"type": "candy"}) <= checkMoney() && checkInventory("candy") > 0) ?  purchaseItem({"type": "candy"}) : console.log("Invalid Purchase")