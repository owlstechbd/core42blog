//slider

$(document).ready(function () {
  // Step 1: Initialize Owl Carousel first
  var owl = $(".owl-carousel").owlCarousel({
    margin: 10,
    mouseDrag: false,
    loop: true, // Enable loop to make carousel infinite
    responsive: {
      0: {
        items: 1.1, // 1.1 items on mobile
      },
      600: {
        items: 2, // 2 items on tablet
      },
      1000: {
        items: 3.5, // 3.5 items on desktop
      },
    },
    onInitialized: function () {
      console.log("Owl Carousel initialized");
      // Call other functions after Owl Carousel has been initialized
      initializeOtherElements(); // Step 2: Initialize other components
    },
    onResized: function () {
      // Ensure heights are recalculated when resized
      equalizeHeights();
    },
  });

  // Custom Navigation Events
  $(".custom-next").click(function () {
    owl.trigger("next.owl.carousel");
  });
  $(".custom-prev").click(function () {
    owl.trigger("prev.owl.carousel", [300]);
  });

  // Step 2: Function to load other elements after slider initialization
  function initializeOtherElements() {
    // Event delegation for opening popups
    $(document).on("click", ".popup-trigger", function () {
      // Get the popup id from the data-popup attribute
      var popupId = $(this).data("popup");
      // Show the corresponding popup
      $("#" + popupId).fadeIn();
    });

    // Close popup event
    $(document).on("click", ".close-btn", function () {
      $(this).closest(".service-popup").fadeOut();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("#desktop-video");
  const mobileVideo = document.querySelector("#mobile-video");

  if (window.innerWidth <= 768) {
    mobileVideo.load();
  } else {
    video.load();
  }
});

//slider-hero
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Function to change slide
function changeSlide(direction) {
  slides[currentSlide].classList.remove("active");

  currentSlide += direction;

  // Looping around the slides
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Loop to last slide
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // Loop to first slide
  }

  slides[currentSlide].classList.add("active");
  document.querySelector(".slider").style.transform = `translateX(-${
    currentSlide * 100
  }%)`;
}

// Auto slide function
function autoSlide() {
  changeSlide(1);
}

// Set interval for auto sliding every 3 seconds
let autoSlideInterval = setInterval(autoSlide, 5000);

// Clear the interval on mouse enter and set it again on mouse leave
document
  .querySelector(".slider-container")
  .addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

document
  .querySelector(".slider-container")
  .addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(autoSlide, 6000);
  });

//popup

// Variable to store the name of the clicked button
let clickedButtonName = "";

// Select all elements with the class 'openPopup' and add event listeners to each
document.querySelectorAll(".openPopup").forEach(function (element) {
  element.addEventListener("click", function () {
    // Capture the button name from the data attribute
    clickedButtonName = element.getAttribute("data-button-name");

    // Set the hidden input field value
    document.getElementById("buttonName").value = clickedButtonName;

    // Display the popup form
    document.getElementById("popupForm").style.display = "flex";
  });
});

// Close button within the popup
document
  .querySelector(".popup-content .close-button")
  .addEventListener("click", function () {
    document.getElementById("popupForm").style.display = "none";
  });

// Close the popup when clicking outside the popup content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("popupForm")) {
    document.getElementById("popupForm").style.display = "none";
  }
});

//leader slider

var leaderOwl = $(".leader-carousel").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: false,
  responsive: {
    0: {
      items: 2, // Show 2 items on mobile devices
    },
    600: {
      items: 3, // Show 3 items on medium devices
    },
    1000: {
      items: 4, // Show 4 items on larger devices
    },
  },
});

//faq

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

//menu

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll("#menu li a");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("menu-active");
});

// Close the menu and remove fixed position from navbar on mobile
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      // Mobile screen size check
      menu.classList.remove("menu-active");
      navbar.classList.add("menu-closed"); // Remove fixed position
    }
  });
});

//partner-logo

const track = document.querySelector(".carousel-track");

// Clone the partner-logos for infinite scroll effect
track.innerHTML += track.innerHTML;

// JavaScript for handling popups
document.addEventListener("DOMContentLoaded", function () {
  const popupTriggers = document.querySelectorAll(".popup-trigger");
  popupTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const popupId = this.getAttribute("data-popup");
      const popup = document.getElementById(popupId);
      popup.style.display = "flex";
    });
  });

  const closeButtons = document.querySelectorAll(".close-btn");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const popup = this.closest(".service-popup");
      popup.style.display = "none";
    });
  });

  const popups = document.querySelectorAll(".service-popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  });
});

//
$('.menu a[href^="#"]').click(function (e) {
  e.preventDefault();
  var target = this.hash;
  $("html, body").animate(
    {
      scrollTop: $(target).offset().top - 50,
    },
    500
  );
});

//

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  document.body.classList.add("safari");
}

// Function to initialize multiselect dropdowns for all forms
function initializeMultiselectDropdowns() {
  document.querySelectorAll(".multiselect-btn").forEach(function (btn) {
    // Toggle the dropdown on button click
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
    });
  });

  // Update button text based on selected checkboxes
  function updateButtonText(button) {
    var selected = Array.from(
      button.parentNode.querySelectorAll(".dropdown-item input:checked")
    ).map(function (item) {
      return item.value;
    });

    var buttonText =
      selected.length > 0 ? selected.join(", ") : "None selected";
    button.textContent = buttonText;
  }

  // Handle multiple checkbox selection without closing dropdown
  document
    .querySelectorAll(".dropdown-item input")
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        var button = this.closest(".multiselect-dropdown").querySelector(
          ".multiselect-btn"
        );
        updateButtonText(button);
      });
    });

  // Prevent dropdown from closing when clicking inside it
  document.querySelectorAll(".dropdown-content").forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  // Close the dropdown when clicking outside the dropdown area
  window.onclick = function (event) {
    if (!event.target.matches(".multiselect-btn")) {
      document
        .querySelectorAll(".dropdown-content")
        .forEach(function (dropdown) {
          if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            dropdown.previousElementSibling.classList.remove("active");
          }
        });
    }
  };
}

// Call the function to initialize multiselect dropdowns
initializeMultiselectDropdowns();

// Get elements
const openImageButton = document.querySelector(".openimage-button");
const popup = document.querySelector(".openimage-popup");
const closeBtn = document.querySelector(".openimage-close");

// Open the popup when the button is clicked
openImageButton.addEventListener("click", () => {
  popup.style.display = "block";
});

// Close the popup when the close button is clicked
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Close the popup if the user clicks outside the image
window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

// Newslatter form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newslatter");

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("smtp.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          // Close the popup form
          // document.getElementById("popupForm").style.display = "none";

          // Open the PDF in the same tab
          window.location.href = "/thank-you.html";
        } else {
          alert("There was an error. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});


//blog-crasoul

$(document).ready(function(){
  $('.blog-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    
    responsive: {
      0: {
        items: 1.9
      },
      600: {
        items: 1.5
      },
      1000: {
        items: 3
      }
    }
  });
});