// rectangles-intersect.js
// two rectangles (non aligned to axis) intersects or not
var linesIntersect = require('line-segments-intersect'),
  pointInside = require('check-point-in-rectangle');

function intersects(rect1,rect2) {
  var intersect = rect1.some(function(pt1,i,r1) {
    //check intersection of any seg or rect1 to any seg of rect2
    var j = i == r1.length-1 ? 0 : i+1;
    return rect2.some(function(pt2,k,r2) {
      var l = k == r2.length-1 ? 0 : k+1;
      return linesIntersect([r1[i], r1[j]], [r2[k], r2[l]]);
    });
  });
  if(!intersect) {
    // check one rectangle contains another
    intersect = rect2.some(function(pt) {
      return pointInside(pt, rect1);
    }) ||
    rect1.some(function(pt) {
      return pointInside(pt, rect2);
    });
  }
  return intersect;
}

module.exports = intersects;
