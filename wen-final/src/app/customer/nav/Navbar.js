"use client";
import React, { useState, useLayoutEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import { Play } from "next/font/google";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { usePathname,useRouter } from 'next/navigation'; 
import { Auth_direct } from '@/Redux/Action';
const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const role = useSelector((state) => state.Rol);
    let dispatch = useDispatch();
    const route = useRouter();

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 991.98);
        };

        handleResize(); // Call initially
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    let Signout = async()=>{
        try{
            const response = await axios.get(`http://localhost:2001/signout`, {
                withCredentials: true
            });
            await dispatch(Auth_direct("Guest"));
            route.push("/signin");
            console.log("Sign out call")
        }
        catch(e)
        {
            console.log("error")
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#95afc0" }}>
                <div className="container">
                    <div className="d-flex w-100 justify-content-between align-items-center"> {/* Utilizing Bootstrap's flex utilities */}
                        <div> {/* Left side */}
                            <Link href="" className='navbar-brand' style={{ fontWeight: "bolder", color: "black", fontSize: "30px" }}>
                                E-Mart
                            </Link>
                        </div>
                        {( /* Render search bar on larger screens */
                            <div className="text-center f1"> {/* Centered */}
                                <input type="text" placeholder="Explore E-Mart" className="form-control" />
                            </div>
                        )}
                        {isSmallScreen ? ( /* Render toggler button on the right only on small screens */
                            <div className="d-flex justify-content-end">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleDrawer}
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        ) : ( /* Render other items on larger screens */
                            <div> {/* Right side */}
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                    {
                                        role == "Customer" ?
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" href=""><FontAwesomeIcon icon={faCartShopping} size="lg" /></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" href=""><FontAwesomeIcon icon={faUser} size="lg" /></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link"  href="" onClick={()=>{
                                                        Signout()
                                                    }}>Sign Out</Link>
                                                </li>
                                            </> :
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" href="/signin">Sign In</Link>
                                                </li>
                                            </>
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {isSmallScreen && (
                <div className={`collapse drawer  navbar-collapse ${isOpen ? 'show' : ''}`}>
                    {
                        role == "Customer" ?
                            <>
                                <Link className="nav-link q1" href="" onClick={()=>{
                                    Signout()
                                }}>Sign Out</Link>
                                <Link className="nav-link q2" href=""><FontAwesomeIcon icon={faCartShopping} size="2xl" /></Link>
                                <Link className="nav-link q3" href=""><FontAwesomeIcon icon={faUser} size="2xl" /></Link>
                            </> :
                            <>
                                <Link className="nav-link q1" href="/signin">Sign In</Link>
                            </>
                    }

                    <button className="btn drawer-close-button btn-outline-danger close-button" onClick={closeDrawer}>
                        close
                    </button>
                </div>
            )}
        </>
    );
};

export default Nav;
