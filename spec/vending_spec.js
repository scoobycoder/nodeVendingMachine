import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import machine, { coinReturn, insertCoin } from "../machine"

describe('Vending Machine', function(){

//     beforeEach(() => injectMocks(ContentService, mocks))

    it('should vend', function(done){
          assert.equal(machine(), true);
          done();
    })

    it('should return the coin inserted', function(done){
      insertCoin({type: 'quarter'})
      assert.deepEqual(coinReturn(), [{"type":"quarter"}]);
      done();
    })  

    it('should return all the coins inserted', function(done){
      insertCoin({type: 'quarter'})
      insertCoin({type: 'dime'})      
      assert.deepEqual(coinReturn(), [{"type":"quarter"}, {"type":"dime"}]);
      done();
    })  

  }
)
