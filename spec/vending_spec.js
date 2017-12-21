import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import { retreiveCoinStatus, coinReturn, insertCoin, chips, candy, itemTray, resetMachine} from "../machine"

describe('Vending Machine', function(){

    beforeEach(() => resetMachine())

    const createDollar = () => ({type: 'dollar', value: 100})
    const createQuarter = () => ({type: 'quarter', value: 25})
    const createDime = () => ({type: 'dime', value: 10})
    const createPenny = () => ({type: 'penny', value: 1})
    const insertTwoQuarters = (number) => { insertCoin(createQuarter()); insertCoin(createQuarter()) }

    xit('should return the coin inserted', function(done){
      insertCoin(createQuarter())
      assert.deepEqual(coinReturn(), [{"type":"quarter", "value":25}]);
      done()
    })  

    xit('should return all the coins inserted', function(done){
      insertCoin(createQuarter())
      insertCoin(createDime())      
      assert.deepEqual(coinReturn(), [{"type":"quarter","value":25}, {"type":"dime","value":10}]);
      done();
    })

    xit('should not take pennies', function(done){
      insertCoin(createPenny())
      assert.deepEqual(coinReturn(), []);
      done()
    })

    xit('should vend chips', function(done) {
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()
      assert.deepEqual(itemTray(), [{"type":"chips"}])
      done()
    })

    xit('should vend candy', function(done){
      insertCoin(createQuarter())
      insertCoin(createQuarter())
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    xit('should vend two items', function(done){
      insertTwoQuarters()
      candy()
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()
      assert.deepEqual(itemTray(), [{"type":"candy"}, {"type":"chips"}])
      done()
    })

    xit('should not vend candy if insufficent money is entered', function(done){
      insertCoin(createQuarter())
      candy()
      assert.deepEqual(itemTray(), [])
      done()
    })

    xit('should vend candy if sufficent money is entered', function(done){
      insertTwoQuarters()
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    xit('should return 25 cents when 75 is entered and candy is purchase', function(done){
      insertCoin(createQuarter())      
      insertTwoQuarters()
      candy()
      assert.deepEqual(coinReturn(), [{"type":"quarter", "value":25}]);
      done()
    })

    xit('should return 10 cents when 60 is entered and candy is purchase', function(done){
      insertTwoQuarters()
      insertCoin(createDime())      
      assert.equal(candy(), 10);
      done()
    })    
    
    xit('should pick coins based on change remaining', function(done){
      insertTwoQuarters()
      insertCoin(createDime())   
      candy()
      assert.deepEqual(coinReturn(), [{"type":"dime", "value":10}]);
      done()
    })

    xit('should make change for chips as well', function(done){
      insertTwoQuarters()
      insertTwoQuarters()
      chips()
      assert.deepEqual(coinReturn(), [{"type":"quarter", "value":25}]);
      done()
    })

    xit('should reduce amount of money available for purchase after each purchase', function(done){
      insertTwoQuarters()
      insertCoin(createDime())   
      candy()
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    xit('should not vend an candy if they are out of stock', function(done){
      insertTwoQuarters()
      candy()
      insertTwoQuarters()
      candy()
      insertTwoQuarters()
      candy()            
      assert.deepEqual(itemTray(), [{"type":"candy"},{"type":"candy"}])
      done()
    })    

    xit('should not vend chips if they are out of stock', function(done){
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()            
      assert.deepEqual(itemTray(), [{"type":"chips"},{"type":"chips"}])
      done()
    })      

    it('should be stocked with change in order to make change', function(done){
      insertTwoQuarters()
      assert.deepEqual(retreiveCoinStatus(), [{"type":"quarter", "value":25}, {"type":"quarter", "value":25}]);
      done()
    })

    xit('should require exact change if no change is available in the machine', function(done){
      insertCoin(createDollar())
      chips()            
      // assert.deepEqual(itemTray(), [{"type":"chips"}])
      assert.deepEqual(coinReturn(), [{"type":"dollar", "value":100}]);      
      done()
    })    

  }
)
