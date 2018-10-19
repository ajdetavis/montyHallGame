/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

var globals = {
  theCar: Math.floor(Math.random() * 3),
  goatImg: 'https://cdn.glitch.com/fccaee2b-81c4-40aa-879c-10b4fb4e407e%2Fgoat.png?1539114342942',
  carImg: 'https://images.pexels.com/photos/849835/pexels-photo-849835.jpeg?auto=compress&cs=tinysrgb&h=350',
  selected: ''
}
//Uncomment below if you want to always win
//console.log(globals.theCar);


var theDOM = {
  slides: document.querySelectorAll('.slide'),//select all of the "sliding doors" on the page
  message: document.querySelector('.messageCenter')//Select the message center
}

//Turn the list of slides into an array
var slidesArr = Array.from(theDOM.slides);

//Add an event listener to each of the doors 
var i;//just to get rid of the annoyting red dot
for (i=0;i<slidesArr.length;i++) {
  var oneClick = true;//make sure that only one door can be selected this round
  var clickTwo = true;//So we can do something different the second round
  slidesArr[i].addEventListener('click' ,theyClicked);//Listen on each "slide" for a click
}

function theyClicked() { 
  if (oneClick) {
   this.parentElement.classList.add('selected');
   globals.selected = this;
   oneClick = false; 
   showAGoat();
  } else if (clickTwo) {
    slidesArr.forEach(function(current) {
      current.parentElement.classList.remove('selected');
    });
    //this.parentElement.classList.add('selected');
    clickTwo = false;
    if (slidesArr.indexOf(this) === globals.theCar) {
      updateMessage(this, 'YOU WON A CAR!!!')
    } else {
      updateMessage(this, 'Sorry, You\'re taking home a goat.')
    }
    openDoors(this);
  }
}

function showAGoat() {
  var aGoat = Math.floor(Math.random() * 3);
  
  if (aGoat === globals.theCar) {
    showAGoat();
  } else if (aGoat === slidesArr.indexOf(globals.selected)) {
     showAGoat();
  } else {
    updateMessage(slidesArr[aGoat], 'Do you want to change doors?');
    openDoors(slidesArr[aGoat]);
  }
  
}


function openDoors(door) {
  door.style.width = '0px';
  door.style.fontSize = '0%';
  if (slidesArr.indexOf(door) !== globals.theCar) {
      door.nextElementSibling.style.width = '100px';
      door.nextElementSibling.src = globals.goatImg;
  } else if (slidesArr.indexOf(door) ===  globals.theCar) {
      door.nextElementSibling.style.width = '100%';
      door.nextElementSibling.src = globals.carImg;
  }
}

function updateMessage(door, message) {
  door.addEventListener('transitionend', function() {
    theDOM.message.textContent = message;
  });
}