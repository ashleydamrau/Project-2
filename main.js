let currentPage = 1;
const apiKey = 'm7U02wuVZ0NYHqjQ6Y4IYiBj8L6IuWMb';
let searchQuery = '';

function searchGiph(page = 1) {
    searchQuery = document.getElementById('search-box').value.trim();
    const limit = 10;
    const offset = (page - 1) * limit;
    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(searchQuery)}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            displayGifs(json.data);
            updatePagination(json.pagination);
        })
        .catch(error => {
            console.error('Error fetching GIFs:', error);
            document.getElementById('gif-results').innerText = 'Failed to load GIFs. Please try again later.';
        });
}

function displayGifs(gifs) {
    const gifResults = document.getElementById('gif-results');
    gifResults.innerHTML = ''; // Clear previous results
    gifs.forEach(gif => {
        const imgUrl = gif.images.fixed_height.url;
        gifResults.innerHTML += `<div><img src="${imgUrl}" alt="GIF"></div>`;
    });
}

function updatePagination(pagination) {
    const previousPageButton = document.getElementById('previousPage');
    const nextPageButton = document.getElementById('nextPage');
    currentPage = (pagination.offset / pagination.count) + 1;
    previousPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = pagination.total_count <= pagination.offset + pagination.count;
}

function nextPage() {
    searchGiph(currentPage + 1);
}

function previousPage() {
    searchGiph(currentPage - 1);
}

function goHome() {
    searchQuery = '';
    document.getElementById('search-box').value = '';
    currentPage = 1;
    searchGiph();

}

function goRandom() {
    const randomIndex = Math.floor(Math.random() * searchQuery.length);
    document.getElementById('search-box').value = searchQuery[randomIndex];
    searchGiph();
}