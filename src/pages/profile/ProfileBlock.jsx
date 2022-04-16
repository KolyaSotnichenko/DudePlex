import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'

const ProfileBlock = () => {

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
                    <img src={image} width="100px" height="100px" />
                </div>
                <div style={{display: 'flex', marginTop: '50px'}}>
                    <h3>{name}</h3>
                </div>
                <p>{email}</p>
            </div>
        </>
    )
}

export default ProfileBlock