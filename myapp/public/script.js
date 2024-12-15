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

//new users get 30% off
function calculateFinalCost(cartPrices, pastPurchase) {
  let sumOfCart = cartPrices.reduce((total, price) => total + price, 0);

  let finalCost;
  let tax;
  let finalCostWithTax

  if (pastPurchase) {
    let discount = (sumOfCart * 30) / 100;
    finalCost = sumOfCart - discount;
    tax = (finalCost * 9.875) / 100;
    finalCostWithTax = finalCost + tax;
  } else {
    finalCost = sumOfCart
    tax = (finalCost * 9.875) / 100;
    finalCostWithTax = finalCost + tax;
  }

  console.log(`Price due: $${finalCostWithTax.toFixed(2)}`);
}