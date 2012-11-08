// SingleQuote

var SingleQuote = function() {};
SingleQuote.prototype.expand = function(tokens) {
  this.index = 0;
  this.result = tokens.slice();
  this.length = tokens.length;

  var result = this.extendTokens();
  return result;
};
SingleQuote.prototype.extendTokens = function() {
  while(this.index < this.length){
    var current = this.getToken();
    var i = this.getIndex();
    var next = this.peekNextToken();
    if(next===null) return this.result;

    if (current === "'") {
      if (next === "(") {
	for (var j = this.length - 1; j >= i + 1; j--) {
	  this.result[j+1] = this.result[j];
	}
	this.result[i] = "(";
	this.result[i+1] = "quote";
	var pos = this.pairParenthesesPosition(i + 2);
	for (var j=this.result.length - 1; j >= pos; j--) {
	  this.result[j+1] = this.result[j];
	}
	this.result[pos] = ")";
	this.index +=  2;
      } else {
	for (var j = this.length - 1; j >= i + 1; j--) {
	  this.result[j + 2] = this.result[j];
	}
        var temp = this.result[i + 1];
        this.result[i+0] = "(";
        this.result[i+1] = "quote";
        this.result[i+2] = temp;
        this.result[i+3] = ")";
        this.index += 3;
      }
    }
    this.length = this.result.length;
  }
  return this.result;
};
SingleQuote.prototype.pairParenthesesPosition = function(start) {
  var i = start + 1;
  var depth = 1;
  try {
    while (depth > 1 ||
           this.result[i] !== ")") {
      if (this.result[i] === "(") { depth++; }
      if (this.result[i] === ")") { depth--; }
      i++;
    }    
  } catch (e) {
    throw e;
  }
  return i;
};
SingleQuote.prototype.peekNextToken = function(token) {
  return (this.index < this.length) ? this.result[this.index] : null;
}
SingleQuote.prototype.getIndex = function() {
  return this.index -1;
};
SingleQuote.prototype.getToken = function(token) {
  var result = this.result[this.index];
  ++this.index;
  return result;
};
SingleQuote.prototype.unGetToken = function(token) {
  this.tokens.push(token);
  --this.index;
  return ;  
};
SingleQuote.prototype.peekCurrentToken = function() {
  return this.tokens[this.index];
};
// SingleQuote.prototype.singleQuoteAdd = function () {
//   return ['(', 'quote'].concat(tokens).concat([')']);
// };

var singleQuote = new SingleQuote();
