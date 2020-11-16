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
    axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=4096650&s='+searchText).then((response)=>{
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
            <h4>`+movie.Title+`</h4>
            <a onClick="movieSelected('`+movie.Title+`')" class="btn btn-primary" >Movie Details</a>
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

    axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=4096650&t='+movieTitle).then((response)=>{
        console.log(response);
    let movie=response.data;
    let output=`
    <div class="row">
    <div class="col-md-4">
    <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
    <h1>${movie.Title}</h1>
    <ul class="list-group">
    <li class="list-group-item" style="font-size:2rem;"><strong>Genre:   </strong>${movie.Genre}</li>
    <li class="list-group-item" style="font-size:2rem;"><strong>Released:   </strong>${movie.Released}</li>
    <li class="list-group-item" style="font-size:2rem;"><strong>Rated:   </strong>${movie.Rated}</li>
    <li class="list-group-item" style="font-size:2rem;"><strong>IMDB Rating:   </strong>${movie.imdbRating}</li>
    <li class="list-group-item" style="font-size:2rem;"><strong>Director:   </strong>${movie.Director}</li>
    <li class="list-group-item" style="font-size:2rem;"><strong>Writer:   </strong>${movie.Writer}</li>
    <li class="list-group-item" style="font-size:2rem;"><strong>Actors:   </strong>${movie.Actors}</li>
    </ul>
    </div>
    </div>

    <div class="row adjust">
    <div class="well">
    <h1>Plot</h1>
    ${movie.Plot}
    <hr>
    <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary" style="font-size:2rem;">View IMDB</a>
    <a href="/" class="btn btn-outline btn-secondary" style="font-size:2rem;">Go Back To Search</a>
    </div>
    </div>
    `;
      
  $('#movie').html(output);

    })
    .catch((err)=>{
        console.log(err);
    })
}
