import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/page-header/PageHeader';
import MovieList from '../../components/movie-list/MovieList';

import { category, movieType} from '../../api/tmdbApi';
import ProfileBlock from './ProfileBlock';
import { useHistory } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import LaterList from './LaterList';

const Profile = () => {

    let history = useHistory()
    let tmdbids
    const [moviesIds, setMoviesIds] = useState()

    useEffect(() => {
        let authToken = sessionStorage.getItem("Auth Token")

        if(!authToken){
            history.push('/signin')
        }
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user.uid)
            const docRef = doc(db, "view-later-list", user.uid)

            getDoc(docRef).then(snapshot => {
                if(snapshot.exists()){
                    console.log("Document data:", snapshot.data());
                    tmdbids = Object.values(snapshot.data())
                    setMoviesIds(tmdbids)
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
                    {moviesIds !== null ? (
                        <MovieList />
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Profile