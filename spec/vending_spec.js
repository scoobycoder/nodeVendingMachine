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
      insertTwoQuarters()
      insertCoin(createQuarter())
      candy()
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
      assert.deepEqual(coinReturn(), [{"type":"quarter","value":25}]);
      done()
    })

    it('should return 15 cents when 65 is entered and candy is purchase', function(done){
      insertTwoQuarters()
      insertCoin(createDime())      
      candy()
      assert.deepEqual(coinReturn(), [{"type":"dime","value":10}]);
      done()
    })    

  }
)
