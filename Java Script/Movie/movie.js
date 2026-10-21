let movies = [];
let rating = [];

function addMovie(){
    let movie = document.getElementById("movie").value;
    let rat = document.getElementById("rating").value;
    movies.push(movie);
    rating.push(rat);
    displayMovies();
}

function displayMovies(){
    let movieList = document.getElementById("movieList");
    movieList.innerHTML = "";
    movies.forEach((movie, index) => {
        let li = document.createElement("li");
        li.textContent = movie + " : " + rating[index];
        movieList.appendChild(li);
    });
}

function editMovies() {
    let editMovie = prompt("Enter the movie name to edit");
    let index = movies.indexOf(editMovie);
    if(index !== -1){
        let newName = prompt("Enter the new movie name");
        movies[index] = newName;
        displayMovies();
    }else{
        alert("Movie not found");
    }
}

function deleteMovies() {
    let deleteMovie = prompt("Enter the movie name to delete");
    let index = movies.indexOf(deleteMovie);
    if(index !== -1){
        movies.splice(index, 1);
        rating.splice(index, 1);
        displayMovies();
    }else{
        alert("Movie not found");
    }
}