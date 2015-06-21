var expect = require('chai').expect,
  intersects = require('../rectangles-intersect.js');
describe('check rectangles interseect', function() {
  it('rectangles intersect', function() {
    expect(
      intersects(
        [[0,10], [10,0], [20,10], [10,20]],
        [[10,10], [20,0], [30,10], [20,20]])
    ).to.be.true;
  });
  it('rectangles do not intersect', function() {
    expect(
      intersects(
        [[5,5], [15,5], [15,15], [5,15]],
        [[0,0], [3,0], [3,3], [0,3]])
    ).to.be.false;
  });
  it('one rectangle contains another', function() {
    expect(
      intersects(
        [[-50,0], [0,-50], [50,0], [0,50]],
        [[0,0], [5,0], [5,5], [0,5]])
    ).to.be.true;
  })
});
