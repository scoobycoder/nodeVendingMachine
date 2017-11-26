import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import { coinReturn, insertCoin, chips, candy, itemTray, resetMachine} from "../machine"

describe('Vending Machine', function(){

    beforeEach(() => resetMachine())

    const createQuarter = () => ({type: 'quarter', value: 25})
    const createDime = () => ({type: 'dime', value: 10})
    const createPenny = () => ({type: 'penny', value: 1})
    const insertTwoQuarters = (number) => { insertCoin(createQuarter()); insertCoin(createQuarter()) }

    it('should return the coin inserted', function(done){
      insertCoin(createQuarter())
      assert.deepEqual(coinReturn(), [{"type":"quarter", "value":25}]);
      done()
    })  

    it('should return all the coins inserted', function(done){
      insertCoin(createQuarter())
      insertCoin(createDime())      
      assert.deepEqual(coinReturn(), [{"type":"quarter","value":25}, {"type":"dime","value":10}]);
      done();
    })

    it('should not take pennies', function(done){
      insertCoin(createPenny())
      assert.deepEqual(coinReturn(), []);
      done()
    })

    it('should vend chips', function(done) {
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()
      assert.deepEqual(itemTray(), [{"type":"chips"}])
      done()
    })

    it('should vend candy', function(done){
      insertCoin(createQuarter())
      insertCoin(createQuarter())
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    it('should vend two items', function(done){
      insertTwoQuarters()
      candy()
      insertTwoQuarters()
      insertCoin(createQuarter())
      chips()
      assert.deepEqual(itemTray(), [{"type":"candy"}, {"type":"chips"}])
      done()
    })

    it('should not vend candy if insufficent money is entered', function(done){
      insertCoin(createQuarter())
      candy()
      assert.deepEqual(itemTray(), [])
      done()
    })

    it('should vend candy if sufficent money is entered', function(done){
      insertTwoQuarters()
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    it('should return 25 cents when 75 is entered and candy is purchase', function(done){
      insertCoin(createQuarter())      
      insertTwoQuarters()
      candy()
      assert.deepEqual(coinReturn(), [{"type":"quarter", "value":25}]);
      done()
    })

    it('should return 10 cents when 60 is entered and candy is purchase', function(done){
      insertTwoQuarters()
      insertCoin(createDime())      
      assert.equal(candy(), 10);
      done()
    })    
    
    it('should pick coins based on change remaining', function(done){
      insertTwoQuarters()
      insertCoin(createDime())   
      candy()
      assert.deepEqual(coinReturn(), [{"type":"dime", "value":10}]);
      done()
    })

    it('should make change for chips as well', function(done){
      insertTwoQuarters()
      insertTwoQuarters()
      chips()
      assert.deepEqual(coinReturn(), [{"type":"quarter", "value":25}]);
      done()
    })

    it('should reduce amount of money available for purchase after each purchase', function(done){
      insertTwoQuarters()
      insertCoin(createDime())   
      candy()
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    it('should not vend an item if it is out of stock', function(done){
      insertTwoQuarters()
      candy()
      insertTwoQuarters()
      candy()
      insertTwoQuarters()
      candy()            
      assert.deepEqual(itemTray(), [{"type":"candy"},{"type":"candy"}])
      done()
    })    
    
  }
)
