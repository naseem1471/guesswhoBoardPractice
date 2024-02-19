var swiper = new Swiper('.Slider-container', {
  effect: 'cards',
  grabCursor: true,
  centerdSlides: true,
  loop: true,
});
// swiper.changeDirection('vertical');

// Declare a global variable for the chosenSlider using let
let chosenSlider = null;

// Get the buttons
const reject = document.getElementById("reject");
const accept = document.getElementById("accept");
// Get the form element
let form = document.getElementById("my-form");


// Add event listeners to the buttons
reject.addEventListener("click", function () {
  // Get the image element of the current slide
  var img = document.querySelector(".swiper-slide:nth-child(" + (swiper.activeIndex + 1) + ") img");
  // Set the opacity of the image to 0.3
  img.style.opacity = 0.05;
  // Move to the next slide
  swiper.slideNext();
});
accept.addEventListener("click", function () {
  // Get the image element of the current slide
  var img = document.querySelector(".swiper-slide:nth-child(" + (swiper.activeIndex + 1) + ") img");
  // Set the opacity of the image to 1
  img.style.opacity = 1;
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
  result.textContent = `The player has chosen image ${chosenSlider}`;

  // Update the src attribute of the image inside .image-container
  let imageContainer = document.querySelector(".image-container img");
  imageContainer.src = `images/img_${chosenSlider}.jpg`;

  
  
  // Hide the form and result paragraph
  form.style.display = "none";
  result.style.display = "none";
   

  console.log(chosenSlider);
});

//console.log(chosenSlider);//





