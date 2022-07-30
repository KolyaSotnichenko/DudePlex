import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import Button from '../../components/button/Button';

import MovieList from '../../components/movie-list/MovieList';
import { useMoralis } from 'react-moralis';

import favourite from '../../assets/heart.png'

const Detail = () => {

    const { category, id } = useParams();
    const [trailer, setTrailer] = useState([]);
    const [item, setItem] = useState(null);
    const [imdbId, setImdbId] = useState(null)
    var [points, setPoints] = useState(0.00000)

    const { isAuthenticated, isInitialized, Moralis, account } = useMoralis()

    function fetchedPoints() {
        return Moralis.Cloud.run("getPoints", {addrs: account})
            .then(function(data) {
                var fetchedpoints = JSON.parse(data)
                setPoints(fetchedpoints)
                return fetchedpoints
            })
    }

    useEffect(() => {

        if(isInitialized){
            fetchedPoints()
        }

        const earnedPoints = setInterval(() => {
            Moralis.Cloud.run("setPoints", {
                addrs: account,
                newPoint: points += 0.00001
            })
            console.log(points)
        },1000)

        return () => {
            
            clearInterval(earnedPoints)
        }
    }, [points])

    useEffect(() => {
         const getVideos = async () => {
                const res = await tmdbApi.getVideos(category, id);
                setTrailer(res.results.slice(0, 5));
            }
        getVideos();
    }, [category, id]);

    useEffect(() => {
        const getExterlanIds = async () => {
            const res = await tmdbApi.getExternalIds(category, id)
            setImdbId(res["imdb_id"])
        }

        getExterlanIds()
    },  [category, id, imdbId])

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{'language': 'uk-UA'}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    const addWaitList = async () => {
        try{
            if(category === 'movie'){
                await Moralis.Cloud.run("setMyMovies", {
                    addrs: account,
                    newFav: imdbId
                })
                 toast.success(`🎥${item.title || item.name} додано до списку "Переглянути пізніше"`)
            }else{
                await Moralis.Cloud.run("setMySeries", {
                    addrs: account,
                    newFav: imdbId
                })
                 toast.success(`🎥${item.title || item.name} додано до списку "Переглянути пізніше"`)
            }   
        }catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres" style={{display: 'flex', alignItems: 'center'}}>
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                    {
                                        item.release_date && (
                                            <span className='genres__item'>{item.release_date}</span>
                                        )
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {trailer.length !== 0 && (
                                        <>
                                            <Button onClick={() => window.open(`https://www.youtube.com/embed/${trailer[0]['key']}`)}>
                                                Трейлер
                                            </Button>
                                            <p style={{paddingLeft: '50px',}} className='rating'>{item["vote_average"]}</p>
                                            <span onClick={addWaitList} style={{ display: isAuthenticated ? 'flex' : 'none' ,marginLeft: '50px', cursor: 'pointer', alignItems: 'center'}} className="btn-add" id="btn-add">
                                                <p>Додати до</p>
                                                <img style={{width: '25px', height: '25px', marginLeft: '5px'}} src={favourite} alt="Favourite list" />
                                            </span>
                                        </>
                                    )}
                                    {trailer.length === 0 && (
                                        <>
                                            <p className='rating'>{item["vote_average"]}</p>
                                            <span onClick={addWaitList} style={{ display: isAuthenticated ? 'flex' : 'none' ,marginLeft: '50px', cursor: 'pointer', alignItems: 'center'}} className="btn-add" id="btn-add">
                                                <p>Додати до</p>
                                                <img style={{width: '25px', height: '25px', marginLeft: '5px'}} src={favourite} alt="Favourite list" />
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Актори</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section  mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Подібні</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
            <ToastContainer />
        </>
    );
}

export default Detail;
