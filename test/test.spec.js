let chai = require('chai');
let expect = chai.expect;
let checkobj_1 = require('../output/theft');
let checkobj_2 = require('../output/assault');
let index = require('../index.js');

describe('Test case for correct output', function()  {
     it ('Test whether the type of output is object or not', function(done)  {
     expect(typeof checkobj_1).to.deep.equal('object');
     done();
    });
    it ('Test whether the type of output is object or not', function(done)  {
     expect(typeof checkobj_2).to.deep.equal('object');
     done();
    });
    
     it ('Test whether the output of json for case1 is an array or not',function(done){
     expect(Array.isArray(index.a)).to.deep.equal(true);
    done();
   });
   
    it ('Test whether the output of json for case2 is an array or not',function(done){
     expect(Array.isArray(index.b)).to.deep.equal(true);
    done();
   });
   
});

