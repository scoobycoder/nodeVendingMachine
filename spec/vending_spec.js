import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import machine, { coinReturn, insertCoin, chips, candy, itemTray, resetMachine, priceItem } from "../machine"

describe('Vending Machine', function(){

    beforeEach(() => resetMachine())

    const createQuarter = () => ({type: 'quarter', value: 25})
    const createDime = () => ({type: 'dime', value: 10})
    const createPenny = () => ({type: 'penny', value: 1})
    const insertTwoQuarters = (number) => { insertCoin(createQuarter()); insertCoin(createQuarter()) }
      
    it('should vend', function(done){
          assert.equal(machine(), true);
          done()
    })

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
      insertTwoQuarters()
      insertCoin(createQuarter())
      candy()
      chips()
      assert.deepEqual(itemTray(), [{"type":"candy"}, {"type":"chips"}])
      done()
    })

    it('should know candy is 50 cents', function(done){
      assert.equal(priceItem({"type":"candy"}), 50)
      done()
    })

    it('should know chips are 75 cents', function(done){
      assert.equal(priceItem({"type":"chips"}), 75)
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

  }
)
