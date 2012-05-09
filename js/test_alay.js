function mainAlay() {
  var alaycator = new AlayCator();
  alaycator.init({
    useMixedCase : false,     
    shortify: true 
  });
  
  /*
  var inputText = 'Script sederhana ini dapat digunakan untuk membuat Text ALAY yang susah diketik oleh manusia biasa. Masukkan teks normal yang ingin dibuat menjadi ALAY Text';
  var outputText = alaycator.convert(inputText);  
  console.log('[' + outputText + ']');
  */
  
  (function goAlay(node) {
    if (node) {
      node = node.firstChild;
      while (node != null) {
        if (node.nodeType == 3) {
          // Text node
          node.textContent = alaycator.convert(node.textContent);          
        } else if (node.nodeType == 1) {
          goAlay(node);
        }
        
        node = node.nextSibling;
      }
    }
  })(document.body);
  
};

window.onload = window.letsgoAlay = mainAlay();

if (!window.letsgoAlay) {
  mainAlay();
}
  /* for IE stuff
  var textContent = 'textContent' in document.body ? 'textContent' : 'innerText';
  for (var i=text_nodes.length-1; i>=0; i--) {
      var dummy = document.createDocumentFragment()
        , node = text_nodes[i]
        , text = node[textContent], tmp;
      for (var j=0; j<text.length; j++) {
          tmp = span.cloneNode(true); // Create clone from base
          tmp[textContent] = text[j]; // Set character
          dummy.appendChild(tmp);     // append span.
      }
      node.parentNode.replaceChild(dummy, node); // Replace
  }
  */
