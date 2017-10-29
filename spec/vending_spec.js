var chai = require("chai");
var machine = require ("../machine")
var expect = chai.expect;
var assert = chai.assert;

describe('Vending Machine', function(){
    it('should vend', function(done){
          assert.equal(machine.vend(), true, 'should vend');
          done();
    })

  }
)
