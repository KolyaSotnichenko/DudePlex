import React, { useEffect, useState } from 'react'
import Button from '../../components/button/Button';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase'

const ProfileBlock = () => {

    let history = useHistory()

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        let authToken = sessionStorage.getItem("Auth Token")

        if(authToken){
            auth.onAuthStateChanged(user => {
                setName(user?.displayName ?? '')
                setEmail(user?.email ?? '')
                setImage(user?.photoURL ?? '')
            })
        }
    }, [])

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{textAlign: 'center'}}>
                    <img src={image} width="100px" height="100px" style={{borderRadius: '50%'}} alt={name} />
                </div>
                <div style={{display: 'flex', marginTop: '50px', justifyContent: 'center'}}>
                    <h3>{name}</h3>
                </div>
                <p>{email}</p>
                <div style={{paddingTop: '50px', marginBottom: '50px', textAlign: 'center'}}>
                    <Button onClick={() => {
                        sessionStorage.removeItem('Auth Token')
                        history.push('/signin')
                    }}>Вийти</Button>
                </div>
            </div>
        </>
    )
}

export default ProfileBlock