import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import { provider, auth} from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom';

const SignIn = () => {

    let history = useHistory()

    useEffect(() => {
        let authToken = sessionStorage.getItem("Auth Token")

        if(authToken){
            history.push('/')
        }
    }, [])

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                sessionStorage.setItem("Auth Token", result.user.refreshToken)
                sessionStorage.setItem("ProfileImg", result.user.photoURL)

                history.push('/profile')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <>
            <PageHeader>
                Увійти в обліковий запис
            </PageHeader>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'center'}} className="section mb-3">
                    <div style={{}}>
                        <GoogleButton onClick={signInWithGoogle}/>
                        <div style={{textAlign: 'center', marginTop: '20px'}}>
                            <Link to="/">
                                Go to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn