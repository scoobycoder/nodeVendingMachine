import chai from 'chai'
import assert from 'chai'
import equal from 'chai'
import machine from "../machine"

describe('Vending Machine', function(){
    it('should vend', function(done){
          assert.equal(machine(), true, 'should vend');
          done();
    })

  }
)
