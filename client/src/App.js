import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<SignupForm />} />
        <Route  path="/signup" element={<SignupForm />} />
        <Route  path="/login" element={<LoginForm />} />
        <Route  path="/home" element={<Home />} />

        {/* <Route  path="/forgot-password" component={ForgotPasswordForm} />
        <Route  path="/register" component={RegistrationForm} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import getRoutes from './routes/routes';

// const App = () => {
//   const token = useSelector((state) => state.user.token);
//   const tokenmm = useSelector((state) => state.user);
//   const renderedRoutes = getRoutes(token);

//   return (
//     <Router>
//       <Routes>
//         {renderedRoutes.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



