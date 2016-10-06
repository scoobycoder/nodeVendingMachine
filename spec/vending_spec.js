var chai = require("chai");
var machine = require ("../machine")
var expect = chai.expect;
var assert = chai.assert;

describe('Vending Machine', function(){
    it('should start', function(done){

          mach = new machine.Machine();

          assert.equal(machine.vend(), true, 'should start');
          done();
    })

  }
)
