import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import machine, { coinReturn, insertCoin, chips, candy, itemTray, resetMachine } from "../machine"

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

  }
)
