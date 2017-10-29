import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import machine, { coinReturn } from "../machine"

describe('Vending Machine', function(){
    it('should vend', function(done){
          assert.equal(machine(), true);
          done();
    })

    it('should respond to coin return', function(done){
      assert.equal(coinReturn(), 'No Coins');
      done();
    })

  }
)
