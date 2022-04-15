import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {

    const {category} = useParams();

    const [videos, setVideos] = useState([]);

    const [imdbId, setImdbId] = useState('')

    // useEffect(() => {
    //     const getVideos = async () => {
    //         const res = await tmdbApi.getVideos(category, props.id);
    //         setVideos(res.results.slice(0, 5));
    //     }
    //     getVideos();
    // }, [category, props.id]);

    useEffect(() => {
        const getExterlanIds = async () => {
            const res = await tmdbApi.getExternalIds(category, props.id)
            setImdbId(res["imdb_id"])
            console.log(res)
        }

        getExterlanIds()
        console.log(imdbId)
    },  [category, props.id])

    return (
        <>
            <Video imdb={imdbId}/>
        </>
    );
}

const Video = props => {

    const imdb = props.imdb

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    // if(window.location.pathname === `/tv/${item}`){
    //     return (
    //         <div className="video">
    //             <div className="video__title">
    //                 <h2>Watch Now for FREE!</h2>
    //             </div>
    //             <iframe
    //                 src={`https://39.svetacdn.in/msNIXXBblTTU?imdb_id=${imdb}`}
    //                 ref={iframeRef}
    //                 width="100%"
    //                 title="video"
    //                 allow='fullscreen'
    //                 allowfullscreen="true"
    //                 webkitallowfullscreen="true"
    //                 mozallowfullscreen="true"
    //             ></iframe>
    //         </div>
    //     )
    // }

    return (
        <div className="video">
            <div className="video__title">
                <h2>Дивіться зараз БЕЗКОШТОВНО!</h2>
            </div>
            <iframe
                src={`https://39.svetacdn.in/msNIXXBblTTU?imdb_id=${imdb}`}
                ref={iframeRef}
                width="100%"
                height="100%"
                title="video"
                allowfullscreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                frameborder="0"
            ></iframe>
        </div>
    )
}

export default VideoList;
