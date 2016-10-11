var chai = require("chai");
var machine = require ("../machine")
var expect = chai.expect;
var assert = chai.assert;

describe('Vending Machine', function(){
    it('should start', function(done){
          assert.equal(machine.vend(), true, 'should start');
          done();
    })

    it('should take coins and return nothing', function(done){
          var coins = {"type": "quarter"};

          assert.equal(machine.coinHolder(coins), null, 'should take coins');
          done();
    })

    it('should only return coins when coin return is called', function(done){
          var coins = {"type": "quarter"};
          machine.coinHolder(coins);

          assert.equal(JSON.stringify(machine.coinReturn()), JSON.stringify(coins), 'should only return coins when coin return is called');
          done();
    })

  }
)
