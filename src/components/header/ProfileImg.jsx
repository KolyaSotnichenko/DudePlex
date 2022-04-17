import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png'
import { auth } from '../../firebase'

const ProfileImg = () => {


    return (
        <>
            <Link to='/profile'>
                <img src={profile} className='header__profile__img' width="50px" height="50px"/>
            </Link>
        </>
    )
}

export default ProfileImg