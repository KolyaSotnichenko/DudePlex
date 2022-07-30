import React, { useRef, useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { useMediaPredicate } from "react-media-hook";

import {ConnectButton} from 'web3uikit'

import './header.scss';

import logo from '../../assets/tmovie.png';
import profile from '../../assets/profile.png'
import favourite from '../../assets/heart.png'
// import ProfileImg from './ProfileImg';

const headerNav = [
    // {
    //     display: 'Головна',
    //     path: '/'
    // },
    {
        display: 'Фільми',
        path: '/movie'
    },
    {
        display: 'Серіали',
        path: '/tv'
    },
    {
        image: profile,
        path: '/profile'
    }
];

const Header = () => {

    const { pathname } = useLocation();
    const { isAuthenticated, Moralis, account} = useMoralis()
    const headerRef = useRef(null);
    const max480 = useMediaPredicate("(max-width: 480px)");
    const min480 = useMediaPredicate("(min-width: 480px)");

    var [points, setPoints] = useState(0.00000)

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">DudePlex</Link>
                </div>
                { isAuthenticated && max480 && (
                        <Link to='/profile'>
                            <img src={favourite} style={{width: '35px', height: '35px'}} alt="View later list" />
                        </Link>
                    )}
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                {e.display && (
                                    <Link to={e.path}>
                                        {e.display}
                                    </Link>
                                )}
                            </li>
                        ))
                    }
                    { isAuthenticated && min480 && (
                        <li>
                            <Link to='/profile'>
                                <img src={favourite} style={{width: '35px', height: '35px'}} alt="View later list" />
                            </Link>
                        </li>
                    )}
                    <li>
                        <ConnectButton />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
