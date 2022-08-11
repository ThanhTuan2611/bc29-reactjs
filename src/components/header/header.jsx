import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { NavLink, useNavigate } from 'react-router-dom';
import { USER_INFO_KEY } from '../../constants/common';
import { setUserInfoAction } from '../../store/actions/user.action';

export default function Header() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userReducer);
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem(USER_INFO_KEY);
        dispatch(setUserInfoAction(null))
    };
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="#"> Movie </a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span></button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to='/'> Home </NavLink>
                        </li>
                    </ul>
                    <div className="ml-auto">
                        {
                            !userState.userInfo ? (
                                <>
                                    <button className="btn btn-outline-info my-2 my-sm-0 mr-2" type="sumit">
                                        Register
                                    </button>
                                    <button onClick={() => navigate("/login")} className="btn btn-outline-success my-2 my-sm-0">Login</button>
                                </>
                            ) : (
                                <>
                                    <span>Xin chào {userState.userInfo.hoTen}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-info">ĐĂNG XUẤT</button>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
