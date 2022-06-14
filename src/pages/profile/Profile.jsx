import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/page-header/PageHeader';
// import MovieList from '../../components/movie-list/MovieList';

// import { category, movieType} from '../../api/tmdbApi';
import { useHistory } from 'react-router-dom';
import LaterListMovies from './LaterListMovies';
import LaterListTvs from './LaterListTvs';

import { useMoralis } from 'react-moralis';


const Profile = () => {

    let history = useHistory()
    const [myMovies, setMyMovies] = useState()
    const [mySeries, setMySeries] = useState()
    const { isAuthenticated, Moralis, account  } = useMoralis()

    useEffect(() => {
        if(!isAuthenticated){
            history.push('/')
        }
    }, [isAuthenticated])

    useEffect(() => {

        async function fetchMyMovies() {
            const theList = await Moralis.Cloud.run("getMyMovies", {addrs: account})

            setMyMovies(theList)
        }

        fetchMyMovies()

    }, [account])

    useEffect(() => {

        async function fetchMySeries() {
            const theList = await Moralis.Cloud.run("getMySeries", {addrs: account})

            setMySeries(theList)
        }

        fetchMySeries()

    }, [account])

    return(
        <>
            <PageHeader>
                Переглянути пізніше
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <div style={{textAlign: 'center'}}>
                        <h2>Фільми</h2>
                    </div>
                    {myMovies ? (
                        <LaterListMovies category='movie' movieIds={myMovies} />
                    ) : null}
                    <div style={{textAlign: 'center',marginTop: '50px'}}>
                        <h2>Серіали</h2>
                    </div>
                    {mySeries ? (
                        <LaterListTvs category='tv' tvsIds={mySeries} />
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Profile