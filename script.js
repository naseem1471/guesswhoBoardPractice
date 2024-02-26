

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved, get,child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";




var swiper = new Swiper('.Slider-container', {
    effect: 'cards',
    grabCursor: true,
    centerdSlides: true,
    loop: true,
  });
// swiper.changeDirection('vertical');


const firebaseConfig = {
apiKey: "AIzaSyBFucjhQZsAngmtUxldhCMS01IdF1EBM5M",
authDomain: "newform-718a7.firebaseapp.com",
databaseURL: "https://newform-718a7-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "newform-718a7",
storageBucket: "newform-718a7.appspot.com",
messagingSenderId: "9032405366",
appId: "1:9032405366:web:6dce6e07ae2f4d1a03aa57"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

// Declare a global variable for the chosenSlider using let
let chosenSlider = null;


// Get the form element
let form = document.getElementById("my-form");
// Get the buttons
const reject = document.getElementById("reject");
const accept = document.getElementById("accept");

// Add event listeners to the buttons
reject.addEventListener("click", function () {
    // Get the image element of the current slide
    var img = document.querySelector(".swiper-slide:nth-child(" + (swiper.activeIndex + 1) + ") img");
    // Set the opacity of the image to 0..05
    img.style.opacity = 0.05;
    // Move to the next slide
    var slideId = document.querySelector(".swiper-slide.swiper-slide-active").getAttribute("data-id");
    colorArray[slideId - 1] = "grey"; // change the color in the array
    set(ref(db,"GAMEBOARD/"+window.sender+"/array"), colorArray); // update the array in the database
    var square = document.querySelector(".square[data-id='" + slideId + "']");
    square.style.backgroundColor = "grey";
    swiper.slideNext();
  });
  accept.addEventListener("click", function () {
    // Get the image element of the current slide
    var img = document.querySelector(".swiper-slide:nth-child(" + (swiper.activeIndex + 1) + ") img");
    // Set the opacity of the image to 1
    img.style.opacity = 1;
    // Set the background color of the square to white
    var slideId = document.querySelector(".swiper-slide.swiper-slide-active").getAttribute("data-id");
    colorArray[slideId - 1] = "#FFD700"; // change the color in the array
    set(ref(db,"GAMEBOARD/"+window.sender+"/array"), colorArray); // update the array in the database
    var square = document.querySelector(".square[data-id='" + slideId + "']");
    square.style.backgroundColor = "#FFD700";
    // Move to the next slide
    swiper.slideNext();
  });

// Add an event listener for the submit event
form.addEventListener("submit", function(event) {
    // Prevent the default form action
    event.preventDefault();
  
    // Get the input value
    let chosen = form.elements["chosen"].value;
  
    // Assign the input value to the global variable
    chosenSlider = chosen;
  
     // Save chosenSlider to localStorage
     localStorage.setItem("chosenSlider", chosenSlider);
     
  
    // Get the result element
    let result = document.getElementById("result");
  
    // Display the result using a template string
    result.textContent = `The player ${window.sender} has chosen image ${chosenSlider}`;
  
    // Update the src attribute of the image inside .image-container
    let imageContainer = document.querySelector(".containerImage img");
    imageContainer.src = `images/img_${chosenSlider}.png`;

    // Hide the form and result paragraph
  form.style.display = "none";
  result.style.display = "block";
  
   

  console.log(chosenSlider);
});

  // variables
  var msgTxt = document.getElementById('msgTxt');
      
  if(sessionStorage.getItem('sender')){
      window.sender = sessionStorage.getItem('sender');
  } else {
      window.sender = prompt('PLEASE ENTER YOUR NAME');
      sessionStorage.setItem('sender',window.sender);
  }

  console.log(window.sender)

  
  // TO SEND MESSAGES
       window.sendMsg = function() {
      var msg = msgTxt.value;
      var timestamp = new Date().getTime();
      var readableTime = new Date(timestamp).toLocaleString();
      set(ref(db,"MESSAGES/"+timestamp),{
          msg : msg,
          sender : sender,
          readableTime: readableTime
      })

      msgTxt.value="";
  }

   // TO RECEIVE MSG
      onChildAdded(ref(db,"MESSAGES"), (data)=>{
      if(data.val().sender == sender){
          messages.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=me>you : "+data.val().msg+"<br> "+data.val().readableTime+"</div></div>";
      } else {
          messages.innerHTML += "<div class=outer id="+data.key+"><div id=inner class=notMe>"+data.val().sender+" : "+data.val().msg+"<br>"+data.val().readableTime+"</div></div>";
      }
  })

            set(ref(db,"GAMEBOARD/"+window.sender),{
        chosenSlider : chosenSlider,
        sender : sender,
        array :[ "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700","#FFD700", "#FFD700", "#FFD700", "#FF700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700" ]
      })

      let colorArray;
        get(child(ref(db), "GAMEBOARD/" + window.sender + "/array")).then((snapshot) => {
          if (snapshot.exists()) {
            colorArray = snapshot.val();
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });



