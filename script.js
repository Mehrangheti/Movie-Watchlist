const bodyList = document.querySelector('.body-list');
bodyList.innerHTML = ` 
<div class="sec">
   <img src="fil.png" class="icon-1">
   <p class="p">Start <br> exploring</p>
</div>
         
`;

document.addEventListener('DOMContentLoaded', function() {
    const bodyList = document.querySelector('.body-list');
    const apiKey = "709f6671"; 
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    document.querySelector('.btn-search').addEventListener('click', function () {
        const input = document.querySelector('input');
        const userApiKey = input.value;

        fetch(`https://www.omdbapi.com/?apikey=a1297d85&plot=full&s=${userApiKey}`)
        .then(res => res.json())
        .then(data => {
            bodyList.innerHTML = "";
            if (data.Search) {
                data.Search.forEach(movie => {
                    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`)
                    .then(res => res.json())
                    .then(movieData => {
                        const movieDetail = document.createElement('div');
                        movieDetail.classList.add('Movie-detail');
                        movieDetail.innerHTML = `
                            <div class="img-div">
                                <img src="${movieData.Poster}" alt="${movieData.Title} Poster">
                            </div>
                            <div class="Movie-D">
                                <div class="Title-rat">
                                    <h2>${movieData.Title}</h2>
                                    <div class="rating">
                                        <i class="fa fa-star"></i>
                                        <p>${movieData.Ratings[0].Value}</p>
                                    </div>
                                </div>
                                <div class="details">
                                    <p>${movieData.Runtime}</p>
                                    <p>${movieData.Genre}</p>
                                    <div class="watch" data-movie='${JSON.stringify(movieData)}'>
                                        <i class="fa fa-plus"></i>
                                        <p class="watch">Watchlist</p>
                                    </div>
                                </div>
                                <div><p>${truncatePlot(movieData.Plot)}</p></div>
                            </div>
                        `;
                        bodyList.appendChild(movieDetail);
                    });
                });
            } else {
                bodyList.innerHTML = "<p>No movies found.</p>";
            }
        });
    });

    bodyList.addEventListener("click", async (e) => {
        const closestWatch = e.target.closest(".watch");
        if (closestWatch) {
            const imdbID = JSON.parse(closestWatch.dataset.movie).imdbID;
    
            if (watchlist.some(movie => movie.imdbID === imdbID)) {
                return;
            }
    
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=709f6671&i=${imdbID}&plot=full`);
                const movieData = await res.json();
                watchlist.push(movieData);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }
    });
});

function truncatePlot(plot) {
    const maxLength = 130; 
    if (plot.length > maxLength) {
        return plot.substring(0, maxLength) + `... <a class="readMore" href='#'>Read more</a>`; 
    }
    return plot;
}
