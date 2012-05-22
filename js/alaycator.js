var AlayCator = function() {
  this.alphabets = 'AEGIOSZ';
  this.numerics = '4361052';
  this.vocales = 'AIUEO';
  
  // set true to mixed lower and mixed case
  this.useMixedCase = false;
  
  // set true to replace some chars with numerics
  this.useNumeric = true;
  
  // set true to remove some vocale chars
  this.shortify = false;
};

AlayCator.prototype.init = function(init) {
  if (init) {
    this.useMixedCase = (typeof init.useMixedCase !== 'undefined') ? init.useMixedCase : false;
    this.useNumeric = (typeof init.useNumeric !== 'undefined') ? init.useNumeric : true;
    this.shortify = (typeof init.shortify !== 'undefined') ? init.shortify : false;
  } else {
    this.useMixedCase = false;
    this.useNumeric = true;
    this.shortify = false;  
  }
};

AlayCator.prototype.convert = function(inputText) {
  // skip empty string
  var textLength = inputText.length;
  if (textLength === 0) {
    return inputText;
  }
  
  var resultText = "";
  var i,j, theChar;

  // modify mixed case
  if (this.useMixedCase) {
    for (i = 0; i < textLength; i++) {
      theChar = inputText.charAt(i);
      
      if (Math.round(2 * Math.random())) {        
        if (theChar === theChar.toLowerCase()) {
          resultText += theChar.toUpperCase();
        } else {
          resultText += theChar.toLowerCase();
        }
      } else {  // no convert
        resultText += theChar;
      }
    }
  } else {
    resultText = inputText;
  }

  // change alphabetic chars to numerics
  var tempString = "";
  textLength = resultText.length;
  if (this.useNumeric) {
    for(i = 0; i < textLength; i++) {
      theChar = resultText.charAt(i);
      
      if (Math.round(2 * Math.random())) {        
        j = this.alphabets.indexOf(theChar.toUpperCase());
        if (j > -1) {
          tempString += this.numerics.charAt(j);
        } else {
          tempString += theChar;
        }
      } else {
        tempString += theChar;
      }
    }
    resultText = tempString;
  }

  // remove some vocale chars
  tempString = "";
  textLength = resultText.length;
  if (this.shortify) {
    for(i = 0; i < textLength; i++) {
      theChar = resultText.charAt(i);
      
      if (Math.round(2 * Math.random())) {
        j = this.vocales.indexOf(theChar.toUpperCase());
        if (j === -1) {
          // not remove vocal
          tempString += theChar;
        }
      } else {
        tempString += theChar;
      }
     }
     resultText = tempString;
   }   

  return resultText;
};

function mainAlay() {
  var alaycator = new AlayCator();
  alaycator.init({
    useMixedCase : false,     
    shortify: true 
  });
  
  (function goAlay(node) {
    if (node) {
      node = node.firstChild;
      while (node !== null) {
        if (node.nodeType === 3) {
          // Text node
          node.textContent = alaycator.convert(node.textContent);          
        } else if (node.nodeType === 1) {
          goAlay(node);
        }
        
        node = node.nextSibling;
      }
    }
  })(document.body);
  
}

window.onload = window.letsgoAlay = mainAlay();

if (!window.letsgoAlay) {
  mainAlay();
}
