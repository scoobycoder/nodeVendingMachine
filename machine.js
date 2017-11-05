let coins = []
let items = []
const prices = [{"candy": 50}]

export const resetMachine = () => {
    clearCoins()
    items = []
}

export const pricer = (item) => {
    if (Object.values(item) == "candy")
    {
        return 50
    }
    else
    {
        return 75
    }
} 

const clearCoins = () => coins = []
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