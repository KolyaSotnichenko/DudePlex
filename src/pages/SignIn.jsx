import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import { provider, auth} from '../firebase'
import { signInWithPopup } from 'firebase/auth';

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
                console.log(result)
                const name = result.user.displayName
                const email = result.user.email
                const profilePic = result.user.photoURL
    
                localStorage.setItem("name", name)
                localStorage.setItem("email", email)
                localStorage.setItem("profilePic", profilePic)
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
                <div className="section mb-3">
                    <button onClick={signInWithGoogle}>Sign In</button>
                </div>
            </div>
        </>
    )
}

export default SignIn