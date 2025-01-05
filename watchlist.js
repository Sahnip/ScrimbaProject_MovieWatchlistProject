

const movieWatchlist = document.querySelector('.movie-list')



//console.log(localStorage)



/*
movieWatchlist.innerHTML = `
    <p class="movie-not-found">Your watchlist is looking a little empty...</p>
    <br>
    <div class="watchlist">
        <a href="index.html">
            <i class="fa-solid fa-circle-plus"></i>
            <button id="addWatchlist">Let’s add some movies!</button>
        </a>
    </div>
`
*/

myWatchlist()

document.addEventListener('click', function(e){
    if(e.target.dataset.removewatchlist){
       removeWatchlistMovie(e.target.dataset.removewatchlist) 
       myWatchlist()
    }
})

function myWatchlist(){
    if(localStorage.length !== 0){
        movieWatchlist.innerHTML = ``
        Object.keys(localStorage).forEach(async function(key) {
            if(key === 'darkmode'){
                console.log("c'est la clés du darkmode")
            }else{
                console.log(key)
                const res = await fetch(`https://www.omdbapi.com/?apikey=bbf15f5&i=${key}`)
                const data = await res.json()
                //console.log(data)
                //console.log(data.Response)
                if(data.Response === 'False'){
                    movieWatchlist.innerHTML = `
                        <p class="movie-not-found">Your watchlist is looking a little empty...</p>
                        <br>
                        <div class="watchlist">
                            <a href="index.html">
                                <i class="fa-solid fa-circle-plus"></i>
                                <button id="addWatchlist">Let’s add some movies!</button>
                            </a>
                        </div>
                    `
                }else{
                    movieWatchlist.innerHTML += `
                    <div class="displayMovie">
                        <div class="poster">
                            <img src="${data.Poster}">
                        </div>
                        
                        <div class="movieDetails">
                            <div class="title-review">
                                <h2 class="titleMovie">${data.Title}</h2>
                                <i class="fa-solid fa-star fa-xs" style="color: #FFD43B;"></i>${data.imdbRating}
                            </div>
                            
                            <div class="details-below-title">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <div class="watchlist">
                                <i class="fa-solid fa-circle-minus" style="color:#000000;"></i>
                                <button id="addWatchlist" data-removewatchlist="${data.imdbID}">Remove</button>
                                </div>
                                
                            </div>
                            <p class="plot-text">${data.Plot}</p>
                        </div>
                    </div>
                    <hr />
                `
                }
            }
            
        })
    }else{
        movieWatchlist.innerHTML = `
                <p class="movie-not-found">Your watchlist is looking a little empty...</p>
                <br>
                <div class="watchlist">
                    <a href="index.html">
                        <i class="fa-solid fa-circle-plus"></i>
                        <button id="addWatchlist">Let’s add some movies!</button>
                    </a>
                </div>
            `
    }

}



function removeWatchlistMovie(idBtn){
    localStorage.removeItem(idBtn)
    alert("le film à bien été retiré")
}

function clearWatchlist(){
    localStorage.clear()
    alert("Votre Watchlist est désormais vide")
}