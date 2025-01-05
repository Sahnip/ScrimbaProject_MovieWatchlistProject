import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const urlWhitIdImbd = "https://www.omdbapi.com/?i=tt3896198&apikey=bbf15f5"

const urlWhitTitleOfMovie = "https://www.omdbapi.com/?apikey=bbf15f5&t=Blade+runner"


const searchInput = document.getElementById("search-movie-input")
const searchBtn = document.getElementById("search-btn")
const movieList = document.querySelector(".movie-list")


searchBtn.addEventListener("click", function(){
    const valueSearch = searchInput.value.replace(/ /,"+")
    console.log(handle(valueSearch))
    handle(valueSearch)
    searchInput.value = ""
})


document.addEventListener('click', function(e){
    if(e.target.dataset.addwatchlist){
       addWatchlistMovie(e.target.dataset.addwatchlist) 
    }
})


async function handle(movie){
    const res = await fetch(`https://www.omdbapi.com/?apikey=bbf15f5&s=${movie}`)
    const data = await res.json()
    console.log(data)
    console.log(data.Response)
    if(data.Response === 'False'){
        movieList.innerHTML = `<p class="movie-not-found">Unable to find what you’re looking for. Please try another search.</p>`
    }else{
        movieList.innerHTML = ``
        const allMovie = data.Search.map(movie => {
            fetch(`https://www.omdbapi.com/?apikey=bbf15f5&t=${movie.Title}&y=${movie.Year}`)
                .then(res => res.json())
                .then(data => {
                    movieList.innerHTML += `
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
                                <i class="fa-solid fa-circle-plus"></i>
                                <button id="addWatchlist" data-addwatchlist="${data.imdbID}">Watchlist</button>
                                </div>
                                
                            </div>
                            <p class="plot-text">${data.Plot}</p>
                        </div>
                    </div>
                    <hr />
                `
                })
            })
    }

}




function addWatchlistMovie(idBtn){
    fetch(`https://www.omdbapi.com/?apikey=bbf15f5&i=${idBtn}`)
        .then(res => res.json())
        .then(data => {
            if(!localStorage.getItem(idBtn)){
                localStorage.setItem(idBtn, data.Title)
                alert("Le film a bien été ajouté")
            }else{
                alert("Le film est déjà ajouté")
            }
            
        })
    
}

