import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './App.css';

function App() {
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = 'a5c3fb3ede946fd8410e2c7a53abb02d'
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

  // variables de estado

  const [movies, setMovies] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion por get a la api

  const fetchMovies = async(searchkey) =>{
    const type = searchkey ? "search" : "discover"
    const {data: {results},
    } = await axios.get(`${API_URL}/${type}/movie`,{
      params: {
        api_key: API_KEY,
        query: searchkey,
      },
    });
    setMovies(results)
    setMovie(results[0])
  }

  // funcion para buscar peliculas
   const searchMovies = (e)=>{
    e.preventDefault();
    fetchMovies(searchkey)
   }

  useEffect(()=>{
    fetchMovies();
  },[])
  
  
  return (
    <div>
      <h2 className='text-center mt-5 mb-5'>Trailer Movies</h2>
      {/*buscador*/}
      <form>
        <input type="text" placeholder='search' onChange={(e)=> setSearchkey(e.target.value)}/>
      </form>





      {/*contenedor que va a mostrar posters de las peliculas actuales*/}
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie)=>(
            <div key={movie.id} className="col-md-4 mb-3">
              <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
              <h4 className='text-center'>{movie.title}</h4>
             </div> 
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
