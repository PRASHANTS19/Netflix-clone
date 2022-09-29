import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai"



const apiKey = "8270303144a1abef5e3700a74cf333c0";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const popular = "popular";
const topRated = "top_rated";
const nowPlaying = "now_playing";


const Card = ({img})=>(

    <img className='card' src={img} alt="cover" />
)

const Row = ({title,arr=[{
    img:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180"
}]})=>(
    <div className='row'>
        <h2>{title}</h2>
       <div>
            {
                arr.map((item,index)=>(
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
                ))
            }
        </div> 
    </div>
)

const Home = () => {
    
    const [upcomingMovies,setUpcomingMovies] = useState([]);
    const [popularMovies,setpopularMovies] = useState([]);
    const [topRatedMovies,settopRatedMovies] = useState([]);
    const [nowPlayingMovies,setnowPlayingMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    //whenever page is load this will call or jv jv koi value change hogi yeh call hoga
    useEffect(()=>{

        //async means it is stuck to that function until it is not completed
        const fetchUpcoming = async()=>{
            const{data : {results}}= await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=2`)
            
            setUpcomingMovies(results);
            // console.log(results);
        };

        const fetchNowPlaying = async()=>{
            const{data : {results}}= await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
            
            setnowPlayingMovies(results);
            // console.log(results);
        };
        const fetchPopular = async()=>{
            const{data : {results}}= await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            
            setpopularMovies(results);
            // console.log(results);
        };
        const fetchTopRated = async()=>{
            const{data : {results}}= await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
            
            settopRatedMovies(results);
            // console.log(results);
        };
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
            console.log(genres);
        };

        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        getAllGenre();

    },[]);


  return (
    
    <section className='home'>
        <div className='banner' style={{
            backgroundImage: popularMovies[2]?`url(${`${imgUrl}/${popularMovies[2].poster_path}`})`:"rgb(22, 20, 20)"
            }}
            >

                {popularMovies[2] && (<h1>{popularMovies[2].original_title}</h1>)}
                {popularMovies[2] && (<p>{popularMovies[2].overview}</p>)}
            
            <div>
                <button><BiPlay/>Play</button>
                <button>MyList <AiOutlinePlus/></button>
            </div>

        </div>
        <Row title={"Upcoming "} arr={upcomingMovies}/>
        <Row title={"Now playing "} arr={nowPlayingMovies}/>
        <Row title={"Top Rated "} arr={topRatedMovies}/>
        <Row title={"Popular"} arr={popularMovies}/>
        
        <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>

        
    </section>
  )
}

export default Home;