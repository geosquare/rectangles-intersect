!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.rectanglesIntersect=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// check-point-in-rectangle.js
// check point intersects with rectangle
// http://martin-thoma.com/how-to-check-if-a-point-is-inside-a-rectangle/
function pointInRect(pt,rect,precision) {
  var p = precision || 6;
  var rectArea = 0.5*Math.abs(
    (rect[0][1] - rect[2][1]) * (rect[3][0] - rect[1][0])
    + (rect[1][1] - rect[3][1]) * (rect[0][0] - rect[2][0])
  );
  var triangleArea = rect.reduce(function(prev,cur, i, arr) {
    var j = i == arr.length-1 ? 0 : i+1;
    return prev + 0.5*Math.abs(
      pt[0] * (arr[i][1] - arr[j][1])
      + arr[i][0] * (arr[j][1] - pt[1])
      + arr[j][0] * (pt[1] - arr[i][1])
    );
  }, 0);
  return fix(triangleArea,p) == fix(rectArea,p);
}
// fix to the precision
function fix(n,p) {
  return parseInt(n * Math.pow(10,p));
};

module.exports = pointInRect;

},{}],2:[function(require,module,exports){
// line-segments-intersect.js 
// intersection point https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
// line 1: x1,y1,x2,y2
// line 2: x3,y3,x4,y4
// for comparing the float number, fixing the number to int to required 
// precision
function linesIntersect(seg1, seg2, precision) {
  var x1 = seg1[0][0],
    y1 = seg1[0][1],
    x2 = seg1[1][0],
    y2 = seg1[1][1],
    x3 = seg2[0][0],
    y3 = seg2[0][1],
    x4 = seg2[1][0],
    y4 = seg2[1][1],
    intPt,x,y,result = false, 
    p = precision || 6,
    denominator = (x1 - x2)*(y3 - y4) - (y1 -y2)*(x3 - x4);
  if (denominator == 0) {
    // check both segments are Coincident, we already know 
    // that these two are parallel 
    if (fix((y3 - y1)*(x2 - x1),p) == fix((y2 -y1)*(x3 - x1),p)) {
      // second segment any end point lies on first segment
      result = intPtOnSegment(x3,y3,x1,y1,x2,y2,p) ||
        intPtOnSegment(x4,y4,x1,y1,x2,y2,p);
    }
  } else {
    x = ((x1*y2 - y1*x2)*(x3 - x4) - (x1 - x2)*(x3*y4 - y3*x4))/denominator;
    y = ((x1*y2 - y1*x2)*(y3 - y4) - (y1 - y2)*(x3*y4 - y3*x4))/denominator;
    // check int point (x,y) lies on both segment 
    result = intPtOnSegment(x,y,x1,y1,x2,y2,p) 
      && intPtOnSegment(x,y,x3,y3,x4,y4,p);
  }
  return result;
} 

function intPtOnSegment(x,y,x1,y1,x2,y2,p) {
  return fix(Math.min(x1,x2),p) <= fix(x,p) && fix(x,p) <= fix(Math.max(x1,x2),p) 
    && fix(Math.min(y1,y2),p) <= fix(y,p) && fix(y,p) <= fix(Math.max(y1,y2),p); 
}

// fix to the precision
function fix(n,p) {
  return parseInt(n * Math.pow(10,p));
}

module.exports = linesIntersect;

},{}],3:[function(require,module,exports){
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

},{"check-point-in-rectangle":1,"line-segments-intersect":2}]},{},[3])(3)
});


//# sourceMappingURL=rectangles-intersect.js.map