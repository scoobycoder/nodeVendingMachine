import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import machine, { coinReturn, insertCoin, chips, candy, itemTray, resetMachine, pricer } from "../machine"

describe('Vending Machine', function(){

    beforeEach(() => resetMachine())

    it('should vend', function(done){
          assert.equal(machine(), true);
          done()
    })

    it('should return the coin inserted', function(done){
      insertCoin({type: 'quarter'})
      assert.deepEqual(coinReturn(), [{"type":"quarter"}]);
      done()
    })  

    it('should return all the coins inserted', function(done){
      insertCoin({type: 'quarter'})
      insertCoin({type: 'dime'})      
      assert.deepEqual(coinReturn(), [{"type":"quarter"}, {"type":"dime"}]);
      done();
    })

    it('should not take pennies', function(done){
      insertCoin({type: 'penny'})
      assert.deepEqual(coinReturn(), []);
      done()
    })

    it('should vend chips', function(done) {
      chips()
      assert.deepEqual(itemTray(), [{"type":"chips"}])
      done()
    })

    it('should vend candy', function(done){
      candy()
      assert.deepEqual(itemTray(), [{"type":"candy"}])
      done()
    })

    it('should vend two items', function(done){
      candy()
      chips()
      assert.deepEqual(itemTray(), [{"type":"candy"}, {"type":"chips"}])
      done()
    })

    it('should know candy is 50 cents', function(done){
      assert.equal(pricer({"type":"candy"}), 50)
      done()
    })

    it('should know chips are 75 cents', function(done){
      assert.equal(pricer({"type":"chips"}), 75)
      done()
    })

    xit('should only vend items if enough money is entered', function(done){
      insertCoin({type: 'quarter'})
      candy()
      assert.deepEqual(itemTray(), [])
      done()
    })

  }
)
