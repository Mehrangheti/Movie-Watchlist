const watchEl = document.querySelector(".watch-list");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


function renderWatchlist() {
    watchEl.innerHTML = ""; 
    watchlist.forEach(movie => {
        const movieDetail = document.createElement('div');
        movieDetail.classList.add('Movie-detail');
        movieDetail.innerHTML = `
            <div class="img-div">
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
            </div>
            <div class="Movie-D">
                <div class="Title-rat">
                    <h2>${movie.Title}</h2>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <p>${movie.Ratings[0].Value}</p>
                    </div>
                </div>
                <div class="details">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <div class="watch" data-id="${movie.imdbID}">
                        <i class="fa fa-remove"></i>
                        <p class="remove">Remove</p>
                    </div>
                </div>
                <div><p>${truncatePlot(movie.Plot)}</p></div>
            </div>
        `;
        watchEl.appendChild(movieDetail);
    });
}


renderWatchlist();


function truncatePlot(plot) {
    const maxLength = 130; 
    if (plot.length > maxLength) {
        return plot.substring(0, maxLength) + `... <a class="readMore" href='#'>Read more</a>`; 
    return plot;
}}