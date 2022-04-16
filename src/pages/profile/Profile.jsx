import React, { useEffect } from 'react'
import PageHeader from '../../components/page-header/PageHeader';
import MovieList from '../../components/movie-list/MovieList';

import { category, movieType} from '../../api/tmdbApi';
import ProfileBlock from './ProfileBlock';
import { useHistory } from 'react-router-dom';

const Profile = () => {

    let history = useHistory()

    useEffect(() => {
        let authToken = sessionStorage.getItem("Auth Token")

        if(!authToken){
            history.push('/signin')
        }
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
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div>
            </div>
        </>
    )
}

export default Profile