import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import { provider, auth} from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button'

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
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn