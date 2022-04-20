import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../../components/movie-list/movie-list.scss';

import SwiperCore, { Autoplay } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../../components/button/Button'

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import axiosClient from "../../api/axiosClient";
import { auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';

import MovieCard from '../../components/movie-card/MovieCard';

const LaterList = props => {

    SwiperCore.use([Autoplay]);

    return (
        <div className="movie-list">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                autoplay
            >
                {/* {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                } */}
            </Swiper>
        </div>
    );
}

// LaterList.propTypes = {
//     ids: PropTypes.array.isRequired,
// }

export default LaterList;
