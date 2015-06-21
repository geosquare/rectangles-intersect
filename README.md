## rectangles-intersect
Determine if two rectangles intersect each other.

## installation
```
npm install rectangles-intersect
```

## usage
```
var intersects = require('rectangles-intersect');
inersects(rect1,rect2 [,precision]);
```

**rect1** and **rect2** are rectangles, array of corner points. Whereas point is array of x and y coordinate.  
**precision** after decimal places, default is 6   
### example
````javascript
var intersects = require('rectangles-intersect');
var check = intersects(
  [[0,10], [10,0], [20,10], [10,20]],
  [[10,10], [20,0], [30,10], [20,20]]);
if (check) {
  console.log('two rectangles intersect');
}
```
## note
In this module my approach is:  
check 1: intersection of any edge of rectangle with another rectangle's edges  
check 2: any corner point of rectangle is inside another rectangle  
If check 1 or check 2 satisfies then rectangles intersect otherwise not.  
This approach is not quite efficient. For improving efficiency get the implementation of [Separating Axis Theorem](http://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169), read more at [wiki](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem) 

## developing
Once you run
 
```npm isntall```

then for running test 

```npm run test```

to create build

```npm run build```

## License
This project is licensed under the terms of the MIT license.
