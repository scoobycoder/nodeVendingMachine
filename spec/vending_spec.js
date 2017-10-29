import chai from 'chai'
let expect = chai.expect;
let assert = chai.assert;
import machine from "../machine"

describe('Vending Machine', function(){
    it('should vend', function(done){
          assert.equal(machine(), true, 'should vend');
          done();
    })

  }
)
