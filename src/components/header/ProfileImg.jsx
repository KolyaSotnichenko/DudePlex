import React from 'react'
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png'

const ProfileImg = () => {

    const profileImg = sessionStorage.getItem("ProfileImg")


    return (
        <>
            <Link to='/profile'>
                <img src={profileImg ? profileImg : profile} className='header__profile__img' width="50px" height="50px" alt='Profile'/>
            </Link>
        </>
    )
}

export default ProfileImg