$(document).ready(function(){
   $('#searchForm').on('submit',(e)=>{
    let searchText=$('#searchText').val(); 
    if(searchText==""){
        $('.full3').addClass("hidden");
        alert("Search field cannot be empty.");
    
        e.preventDefault();
    }
    else{
    getMovies(searchText); 
    e.preventDefault(); 
    }
  
   });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=4096650&s='+searchText).then((response)=>{
        console.log(response);
    if(response.data.Error==="Movie not found!"){
        $('.full3').addClass("hidden");
        alert("Movie not found.");
    }
    else{
        let movies =response.data.Search;
        console.log(movies);
   
        let output='';
        $.each(movies,(index,movie)=>{
            output+=`
            <div class="col-md-3">
            <div class="well text-center">
            <img src="`+movie.Poster+`">
            <h5>`+movie.Title+`</h5>
            <a onClick="movieSelected('`+movie.Title+`')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
            </div>
            `;
        })
        $('.full3').removeClass("hidden");
        $('#movies').html(output);
    }
    })
    .catch((err)=>{
        console.log(err);
    })
}

function movieSelected(title){
  
sessionStorage.setItem("movieTitle",title);
window.location='movie';
return false;
}

function getMovie(){

    let movieTitle=sessionStorage.getItem("movieTitle");

    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=4096650&t='+movieTitle).then((response)=>{
        console.log(response);
    let movie=response.data;
    let output=`
    <div class="row">
    <div class="col-md-4">
    <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
    <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
    <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
    <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
    <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
    <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
    <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
    <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
    </ul>
    </div>
    </div>

    <div class="row adjust">
    <div class="well">
    <h3>Plot</h3>
    ${movie.Plot}
    <hr>
    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
    <a href="/" class="btn btn-default">Go Back To Search</a>
    </div>
    </div>
    `;
      
  $('#movie').html(output);

    })
    .catch((err)=>{
        console.log(err);
    })
}
