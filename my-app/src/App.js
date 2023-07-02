
import './App.css';
import api from './api/axios';
import React,{ useState,useEffect } from 'react';
 
import Layout from './components/Layout';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Hero from './components/Hero'
import Header from './components/Header';
import Trailer from './components/Trailer';
import Reviews from './components/Reviews';
import NotFound from './components/NotFound';
function App() {
  const [movies,setMovies]=useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }
  const getMovieData=async(movieId)=>{
    try{
      const response=await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie=response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    }
    catch(error)
    {
      console.log(error);
    }
  }
  useEffect(()=>{
    getMovies();

    // axios.get("http://localhost:8080/api/v1/movies")
    // .then((response)=>{
    //   setMovies(response.date);
    //   console.log(response.data);
    // })
    // .catch((err)=>{
    //   alert("error")
    //   console.log(err);
    // })

  
},[])

  return (
    <div className="App">
       <Header/>
     <Routes>
    
      <Route path="/" element={<Home movies={movies}/>}/>
      
      <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}/>
      <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}/>
      <Route path="*" element = {<NotFound/>}/>
      <Route path="/" element={<Layout/>}/>
     </Routes>
    </div>
  );
}

export default App;
 