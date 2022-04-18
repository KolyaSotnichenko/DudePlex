import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/page-header/PageHeader';
import MovieList from '../../components/movie-list/MovieList';

import { category, movieType} from '../../api/tmdbApi';
import ProfileBlock from './ProfileBlock';
import { useHistory } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';

const Profile = () => {

    let history = useHistory()
    let tmdbids

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
                }else{
                    console.log("No such document!");
                }
            })
        })

    }, [tmdbids])

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
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div>
            </div>
        </>
    )
}

export default Profile