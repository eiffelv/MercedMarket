
//function to search for term on the website
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const content = document.getElementById('content').innerText.toLowerCase();

    if (content.includes(searchTerm)) {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<p>Search term found: <a href="#">${searchTerm}</a></p>`);
    } else {
        alert('Search term not found.');
    }
});