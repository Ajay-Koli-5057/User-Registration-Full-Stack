// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import PublicRoute from './publicRoutes';
// import ProtectedRoute from './protectedRoutes';
// import LoginForm from '../components/LoginForm/LoginForm';
// import SignupForm from '../components/SignupForm/SignupForm';
// import UserTable from '../components/UserTable/UserTable';


// const routes = (user) => [
//     {
//         path: '/',
//         element: <Navigate to={user && '/signup'} />,
//     },
//     {
//         path: '/signup',
//         element: (
//             <PublicRoute redirectTo="/home">
//                 <SignupForm />
//             </PublicRoute>
//         ),
//     },
//     {
//         path: '/login',
//         element: (
//             <PublicRoute redirectTo="/home">
//                 <LoginForm />
//             </PublicRoute>
//         ),
//     },
//     {
//         path: '/home',
//         element: (
//             <ProtectedRoute redirectTo="/home">
//                 <UserTable />
//             </ProtectedRoute>
//         ),
//     },
// ];
// export default routes;

