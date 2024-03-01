

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved, get,child, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', (event) => {



var swiper = new Swiper('.Slider-container' , {
    effect: 'cards',
    grabCursor: true,
    centerdSlides: true,
    loop: true,
    // swiper.changeDirection('vertical');
     // Add event listener for slide change
  on: {
    slideChange: function () {
      // Get the active slide element
      var activeSlide = swiper.slides[swiper.activeIndex];
      
      // Get the image element of the active slide
      var img = activeSlide.querySelector('img');
      
      // Get the alt text of the image
      var altText = img.getAttribute('alt');
      
      // Set the alt text as the content of the paragraph element
      document.getElementById('image-name').textContent = altText;
    }
  }
  });
      // Manually trigger the slideChange event after Swiper initialization
    swiper.on('init', function () {
      swiper.emit('slideChange');
    });

  

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFucjhQZsAngmtUxldhCMS01IdF1EBM5M",
  authDomain: "newform-718a7.firebaseapp.com",
  databaseURL: "https://newform-718a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "newform-718a7",
  storageBucket: "newform-718a7.appspot.com",
  messagingSenderId: "9032405366",
  appId: "1:9032405366:web:6dce6e07ae2f4d1a03aa57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

// Declare a global variable for the chosenSlider using let
let chosenSlider = null;
// Global variable to hold the other player's array
let otherPlayersArray;


// Get the form element
let form = document.getElementById("my-form");
// Get the buttons
const reject = document.getElementById("reject");
const accept = document.getElementById("accept");

// Add event listeners to the buttons
reject.addEventListener("click", function () {
    // Get the image element of the current slide
    var img = document.querySelector(".swiper-slide:nth-child(" + (swiper.activeIndex + 1) + ") img");
    // Set the opacity of the image to 0.025
    img.style.opacity = 0.025;
    // Move to the next slide
    var slideId = document.querySelector(".swiper-slide.swiper-slide-active").getAttribute("data-id");
    yourArray[slideId - 1] = "grey"; // change the color in the array
    set(ref(db,"GAMEBOARD/"+window.sender+"/array"), yourArray); // update the array in the database
    var square = document.querySelector(".square[data-id='" + slideId + "']");
    square.style.backgroundColor = "grey";
    swiper.slideNext();
  });
    accept.addEventListener("click", function () {
    // Get the image element of the current slide
    var img = document.querySelector(".swiper-slide:nth-child(" + (swiper.activeIndex + 1) + ") img");
    // Set the opacity of the image to 1
    img.style.opacity = 1;
    // Set the background color of the square to #FFD700
    var slideId = document.querySelector(".swiper-slide.swiper-slide-active").getAttribute("data-id");
    yourArray[slideId - 1] = "#FFD700"; // change the color in the array
    set(ref(db,"GAMEBOARD/"+window.sender+"/array"), yourArray); // update the array in the database
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
              array :[ "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700",  ]
            })

          let yourArray;
          get(child(ref(db), "GAMEBOARD/" + window.sender + "/array")).then((snapshot) => {
        if (snapshot.exists()) {
          yourArray = snapshot.val();
          
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      async function getPlayers() {
        let players = []; // Declare players as an empty array

        // Get a list of all players from the database
        try {
          const snapshot = await get(child(ref(db), 'GAMEBOARD'));
          if (snapshot.exists()) {
            console.log("players:", snapshot.val());
            players = Object.keys(snapshot.val()); // Get player names
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error(error);
        }

        return players;
      }

            // Usage:
      getPlayers().then((players) => {
        // You can set up listeners for each player here
        players.forEach((player) => {
          onValue(ref(db, `GAMEBOARD/${player}/array`), (snapshot) => {
            if (sender !== player) { // If the current user is not the player
              otherPlayersArray = snapshot.val(); // Update the global variable
              console.log('otherPlayersArray updated:', otherPlayersArray); // Log the updated otherPlayersArray

              // Call the updateBoard function
              updateBoard(otherPlayersArray);
            }
          });
        });
      });

      // Function to update the board
      function updateBoard(colorCodes) {
        console.log('updateBoard called'); // Log when updateBoard is called
        if (colorCodes) {
          // Loop through the colorCodes array
          for (let i = 0; i < colorCodes.length; i++) {
            // Get the square element corresponding to the current index
            let square = document.querySelector(`.square[data-id='${i + 41}']`);
            console.log('Square selected:', square); // Log the selected square
            
            // Update the background color of the square based on the color in the array
            square.style.backgroundColor = colorCodes[i];
            console.log('Background color set to:', colorCodes[i]); // Log the set background color
          }
        }
      }
    });