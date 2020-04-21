
function movieTemplate(movie) {   
    return `
    <div class="col-md-4 col-sm-12" style="padding-right: 0px; padding-left: 0px;">
    <div class="movie">
    <img class="movie-poster" src="${movie.Poster}">
    <h2 class="movie-title">${movie.Title}</h2>
    <h4 class="movie-type">${movie.Type}</h4>
    <h4 class="movie-runtime">${movie.Runtime !==undefined ? movie.Runtime :""}</h4>
    <h4 class="movie-genre">${movie.Genre !==undefined ? movie.Genre :""}</h4>
    <h4 class="movie-ratings">${movie.imdbRating !==undefined ? movie.imdbRating :""}</h4>
    <p style="color: #D6D3CD;"><strong>Year:</strong> ${movie.Year}</p>
    </div>
    </div>
    `;
}

function getHtml(jsonData) {
    if (jsonData) {
        document.getElementById("search-results").innerHTML = `
    <h1 class="total-count">${jsonData.length>1 ? jsonData.length :1 } results </h1></br><div class="row">
    ${jsonData.length>1 ? jsonData.map(movieTemplate).join("") : movieTemplate(jsonData)}
    </div><p class="footer">${jsonData.length>1 ? jsonData.length :1} results</p>
    `;
    }  else {
        document.getElementById("search-results").innerHTML = `
    <h1 class="total-count">Not Found</h1>
    `;
    }

}
async function getMovieData(mname, mtype) {
    const api_url = "http://www.omdbapi.com/?apikey=779f9ccb&" + mtype + "=" + mname;
    let html = '';
    fetch(api_url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (mtype === "s") {
                getHtml(data.Search);
            } else {
                getHtml(data);
            }
        });

}

jQuery('body').on('click', '#movie-search', function () {
    var movieName = document.getElementById("movie-name-input").value;
    var searchType = document.getElementById("select-drop");
    var selectedType = searchType.options[searchType.selectedIndex].value;

    getMovieData(movieName, selectedType);
})