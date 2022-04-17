import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { doc, setDoc } from "firebase/firestore";

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import Button from '../../components/button/Button';

import MovieList from '../../components/movie-list/MovieList';
import { auth, db } from '../../firebase';

const Detail = () => {

    const { category, id } = useParams();
    const [uid, setUid] = useState(null);
    const [authToken, setAuthToken] = useState(null)
    const [trailer, setTrailer] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
         const getVideos = async () => {
                const res = await tmdbApi.getVideos(category, id);
                setTrailer(res.results.slice(0, 5));
            }
        getVideos();
    }, [category, id]);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{'language': 'uk-UA'}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUid(user?.uid)
        })
    }, [])

    useEffect(() => {
        setAuthToken(sessionStorage.getItem("Auth Token"))
    }, [])


    const addWaitList = async () => {
        try{
            await setDoc(doc(db, "view-later-list", uid), {
                list: [{tmdb_id: id}],
            }, {merge: true})
            console.log("Document written with ID: ", id);
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
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {trailer.length !== 0 && (
                                        <>
                                            <Button onClick={() => window.location.href = `https://www.youtube.com/embed/${trailer[0]['key']}`}>
                                                Трейлер
                                            </Button>
                                            <p style={{paddingLeft: '50px',}} className='rating'>{item["vote_average"]}</p>
                                            <span onClick={addWaitList} style={{ display: authToken ? 'inline-block' : 'none' ,marginLeft: '50px', cursor: 'pointer'}} className="btn-add" id="btn-add">Переглянути пізніше</span>
                                        </>
                                    )}
                                    {trailer.length === 0 && (
                                        <>
                                            <p className='rating'>{item["vote_average"]}</p>
                                            <span style={{marginLeft: '50px', cursor: 'pointer'}} className="genres__item">Переглянути пізніше</span>
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
        </>
    );
}

export default Detail;
