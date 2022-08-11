import React from 'react';
import { useRoutes } from 'react-router-dom';
import AdminGuard from '../guards/admin.guard';
import AuthGuard from '../guards/auth.guard';
import NoAuthGuard from '../guards/no-auth.gurad';
import AdminLayout from '../layouts/admin';
import HomeLayout from '../layouts/home';
import Booking from '../pages/booking/booking';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import MovieDetail from '../pages/movie-detail/movie-detail';
import MovieManagement from '../pages/movies-management/movie-management';

export default function Router() {
    const routing = useRoutes([
        {
            path: '/',
            element: <HomeLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/movie/:movieId', // movieId là id có thể thay đổi được
                    element: <MovieDetail />
                },
                {
                    path: '/',
                    element: <AuthGuard />,
                    children: [
                        {
                            path: '/booking/:maLichChieu',
                            element: <Booking />
                        },
                    ],
                },
                {
                    path: '/',
                    element: <NoAuthGuard />,
                    children: [
                        {
                            path: '/login',
                            element: <Login />
                        }
                    ]
                }
            ]
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin/',
                    element: <AdminGuard />,
                    children: [
                        {
                            path: '/admin/movie-management',
                            element: <MovieManagement />
                        }
                    ]
                },

            ],
        },
    ]);

    return routing;
}
