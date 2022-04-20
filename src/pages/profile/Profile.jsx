import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/page-header/PageHeader';
import MovieList from '../../components/movie-list/MovieList';

import { category, movieType} from '../../api/tmdbApi';
import ProfileBlock from './ProfileBlock';
import { useHistory } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import LaterListMovies from './LaterListMovies';
import LaterListTvs from './LaterListTvs';

const Profile = () => {

    let history = useHistory()
    let tmdbidsMovies
    let tmdbidsTvs
    const [moviesIds, setMoviesIds] = useState()
    const [tvsIds, setTvsIds] = useState()

    useEffect(() => {
        let authToken = sessionStorage.getItem("Auth Token")

        if(!authToken){
            history.push('/signin')
        }
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user.uid)
            const docRef = doc(db, "later-movies", user.uid)

            getDoc(docRef).then(snapshot => {
                if(snapshot.exists()){
                    console.log("Document data:", snapshot.data());
                    tmdbidsMovies = Object.values(snapshot.data())
                    setMoviesIds(tmdbidsMovies)
                }else{
                    console.log("No such document!");
                }
            })
        })

    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user.uid)
            const docRef = doc(db, "later-tv", user.uid)

            getDoc(docRef).then(snapshot => {
                if(snapshot.exists()){
                    console.log("Document data:", snapshot.data());
                    tmdbidsTvs = Object.values(snapshot.data())
                    setTvsIds(tmdbidsTvs)
                }else{
                    console.log("No such document!");
                }
            })
        })

    }, [])

    return(
        <>
            <PageHeader>
                Профіль
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ProfileBlock />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <h2>Фільми</h2>
                    </div>
                    {moviesIds ? (
                        <LaterListMovies category='movie' movieIds={moviesIds} />
                    ) : null}
                    <div style={{textAlign: 'center',marginTop: '50px'}}>
                        <h2>Серіали</h2>
                    </div>
                    {tvsIds ? (
                        <LaterListTvs category='tv' tvsIds={tvsIds} />
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Profile