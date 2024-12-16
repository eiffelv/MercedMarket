//function to search for term on the website
document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const content = document.getElementById("content").innerText.toLowerCase();

  if (content.includes(searchTerm)) {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      `<p>Search term found: <a href="#">${searchTerm}</a></p>`
    );
  } else {
    alert("Search term not found.");
  }
});

// Making the hamburger menu toggle the visiablity of nav-links
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  console.log("Hamburger menu clicked, class toggled");
});

// Ad Rotator Functionality
const adImages = [
  'assests/iPhone16Pro.png',
  'assests/BetterHealth.png'
];

let currentAdIndex = 0;
const adImageElement = document.querySelector('.ad-image');

// Function to rotate ads
function rotateAds() {
  currentAdIndex = (currentAdIndex + 1) % adImages.length; // Move to the next ad
  adImageElement.style.opacity = 0; // Fade out current ad properly
  setTimeout(() => {
    adImageElement.src = adImages[currentAdIndex]; // Changes image src
    adImageElement.style.opacity = 1; // Fade into new ad
  }, 500); // Sync with CSS Transtion time
}

//add item to cart
document.getElementById('addToCartButton').addEventListener('click', function() {
    const productId = 1; // Replace with the actual product ID
    const quantity = 1; // Replace with the desired quantity
  
    fetch('/cart', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId, quantity })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Item added to cart!');
    } else {
      alert('Failed to add item to cart.');
    }
  })
  .catch(error => console.error('Error:', error));
});
})


setInterval(rotateAds, 3000);