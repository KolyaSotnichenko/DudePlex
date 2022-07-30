import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/page-header/PageHeader';
// import MovieList from '../../components/movie-list/MovieList';

// import { category, movieType} from '../../api/tmdbApi';
import { useHistory } from 'react-router-dom';
import LaterListMovies from './LaterListMovies';
import LaterListTvs from './LaterListTvs';

import sun from '../../assets/sun.png'

import { useMoralis } from 'react-moralis';


const Profile = () => {

    let history = useHistory()
    const [myMovies, setMyMovies] = useState()
    const [mySeries, setMySeries] = useState()
    var [points, setPoints] = useState(0.00000)
    const { isAuthenticated, isInitialized, Moralis, account  } = useMoralis()

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

    function fetchedPoints() {
        return Moralis.Cloud.run("getPoints", {addrs: account})
            .then(function(data) {
                var fetchedpoints = JSON.parse(data)
                setPoints(fetchedpoints)
                return fetchedpoints
            })
    }

    useEffect(() => {

        if(isInitialized){
            fetchedPoints()
        }

        return () => {
            console.log("Ok")
        }
    }, [])

    return(
        <>
            <PageHeader></PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <div
                        className='mb-3'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <p>{points.toFixed(5)}</p>
                        <img style={{width: '25px', height: '25px', marginLeft: '5px'}} src={sun} alt="SunPoints" />
                    </div>
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