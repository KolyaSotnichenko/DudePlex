import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

import {ConnectButton} from 'web3uikit'

import './header.scss';

import logo from '../../assets/tmovie.png';
import profile from '../../assets/profile.png'
// import ProfileImg from './ProfileImg';

const headerNav = [
    {
        display: 'Головна',
        path: '/'
    },
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
    const { isAuthenticated} = useMoralis()
    const headerRef = useRef(null);

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
                    { isAuthenticated && (
                        <li>
                            <Link to='/profile'>
                                Мій список
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
