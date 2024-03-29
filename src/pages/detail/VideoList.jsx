import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

import Lottie from 'react-lottie';
import notFound from '../../lotties/not-found.json'

const VideoList = props => {

    const {category} = useParams();

    // const [videos, setVideos] = useState([]);

    const [imdbId, setImdbId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

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
        }

        getExterlanIds()
    },  [category, props.id, imdbId])

    useEffect(() => {
        if(!imdbId) return
        fetch(`https://3442534688564.svetacdn.in/msNIXXBblTTU?imdb_id=${imdbId}`)
            .then(response => {
                console.log(response.status)
                if(response.status === 200){
                    setIsLoaded(true)
                }
            }).catch(error => {
                console.log(error)
                setIsLoaded(false)
            })
    }, [imdbId])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFound,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
            {isLoaded ? (
                <Video imdb={imdbId}/>
            ) : (
                <>
                    <div className='lottieStyle'>
                        <Lottie 
                            options={defaultOptions}
                            height={"100%"}
                            width={"100%"}
                        />
                    </div>
                </>
            )}
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

    return (
        <div className="video">
            <div className="video__title">
                <h2>Дивіться зараз БЕЗКОШТОВНО!</h2>
            </div>
            <iframe
                src={`https://3442534688564.svetacdn.in/msNIXXBblTTU?imdb_id=${imdb}`}
                ref={iframeRef}
                width="100%"
                height="100%"
                title="video"
                loading='eager'
                allowFullScreen={true}
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                frameBorder="0"
            ></iframe>
        </div>
    )
}

export default VideoList;
