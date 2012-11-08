// var TAG = (function() {
//   var tag = new Object();
//   tag.SEPARETOR = 0;
//   tag.NUMBER = 0;
//   tag.NUMBER = 0;
//   return tag;
// }());

// var createNumberToken = function(str) {
//     return createToken(str, TAG.NUMBER);
// };

// // 分割Token オブジェクトのコンストラクタ
// var createSeparetorToken = function(str) {
//   return createToken(str, TAG.SEPARETOR);
// };

// // Token オブジェクトのコンストラクタ
// var createToken = function(str, tag) {
//   var obj = {};
//   obj.str = str;
//   obj.tag = tag;
//   return obj;
// };

  var parseList = function (ary) {

    var retCell = new LCell();
    var cell = retCell;

    for (var i=1; ary[i] !== ")"; i++) {
      if (ary[i] !== "(") {

        cell.car = parseAtom(ary[i]);
      } else {
        if (ary[i] === "(") {
	  var childAry = [];
	  for (var j=0, depth=0; depth > 1 || ary[i+j] !== ")"; j++) {
	    if (ary[i+j] === "(") { depth++; }
	    if (ary[i+j] === ")") { depth--; }
	    childAry[j] = ary[i+j];
	  }
	  childAry[j] = ")";
	  cell.car = parseList(childAry);
	  
	  i = i + j;
        }
      }
      if (ary[i+1] !== ")") {
        cell.cdr = new LCell();
        cell = cell.cdr;
      } else {
        cell.cdr = Nil;
      }
    }
    return retCell;
  };
