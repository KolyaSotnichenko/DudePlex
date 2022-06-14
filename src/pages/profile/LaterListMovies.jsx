import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import '../../components/movie-list/movie-list.scss';

import SwiperCore, { Autoplay } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
// import { Link } from 'react-router-dom';

// import Button from '../../components/button/Button'

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
// import axiosClient from "../../api/axiosClient";
// import { auth, db } from '../../firebase';
// import { getDoc, doc } from 'firebase/firestore';

import MovieCard from '../../components/movie-card/MovieCard';

const LaterListMovies = props => {

    SwiperCore.use([Autoplay]);

    const [items, setItems] = useState()

    // let moviesList

    useEffect(() => {

        getListMovies()
    }, [])

    const getListMovies = async () => {
        let newList = []

        Promise.all(props.movieIds.map((i) => {
            tmdbApi.find(i, {params: {api_key: apiConfig.apiKey, external_source: 'imdb_id'}})
                .then(response => {
                    newList.push(response.movie_results)
                    setItems(newList.flat())
            })

        }))

        // moviesList =  data


        // return setItems(...moviesList)
    }

    return (
        <div className="movie-list">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                autoplay
            >
                    { items ? 
                        items.map((item, i) => (
                            <SwiperSlide key={i}>
                                <MovieCard item={item} category={props.category}/>
                            </SwiperSlide>
                        ))
                    : null}
            </Swiper>
        </div>
    );
}

// LaterList.propTypes = {
//     ids: PropTypes.array.isRequired,
// }

export default LaterListMovies;
