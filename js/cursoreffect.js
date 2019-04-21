// // List of sentences
// var _CONTENT = [
// 	"UI/UX Developer",
// 	"Graphic Designer",
// 	"Marketing Enthusiast",
//
// ];
//
// // Current sentence being processed
// var _PART = 0;
//
// // Character number of the current sentence being processed
// var _PART_INDEX = 0;
//
// // Holds the handle returned from setInterval
// var _INTERVAL_VAL;
//
// // Element that holds the text
// var _ELEMENT = document.querySelector("#text");
//
// // Cursor element
// var _CURSOR = document.querySelector("#cursor");
//
// // Implements typing effect
// function Type() {
// 	// Get substring with 1 characater added
// 	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
// 	_ELEMENT.innerHTML = text;
// 	_PART_INDEX++;
//
// 	// If full sentence has been displayed then start to delete the sentence after some time
// 	if(text === _CONTENT[_PART]) {
// 		// Hide the cursor
// 		_CURSOR.style.display = 'none';
//
// 		clearInterval(_INTERVAL_VAL);
// 		setTimeout(function() {
// 			_INTERVAL_VAL = setInterval(Delete, 50);
// 		}, 1000);
// 	}
// }
//
// // Implements deleting effect
// function Delete() {
// 	// Get substring with 1 characater deleted
// 	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
// 	_ELEMENT.innerHTML = text;
// 	_PART_INDEX--;
//
// 	// If sentence has been deleted then start to display the next sentence
// 	if(text === '') {
// 		clearInterval(_INTERVAL_VAL);
//
// 		// If current sentence was last then display the first one, else move to the next
// 		if(_PART == (_CONTENT.length - 1))
// 			_PART = 0;
// 		else
// 			_PART++;
//
// 		_PART_INDEX = 0;
//
// 		// Start to display the next sentence after some time
// 		setTimeout(function() {
// 			_CURSOR.style.display = 'inline-block';
// 			_INTERVAL_VAL = setInterval(Type, 100);
// 		}, 200);
// 	}
// }
//
// // Start the typing effect on load
// _INTERVAL_VAL = setInterval(Type, 100);


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 5) || 100;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 210 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #ffffff }";
  document.body.appendChild(css);
};
