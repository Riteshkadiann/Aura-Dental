import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import DentalApp from "./core/DentalApp";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from './lib/Signin.jsx'
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";

import Menu from "./core/Menu";
function MainRouter() {
  return (
    <div>
      
      <Routes>
         <Route path="/" element={<DentalApp />} />
         <Route path="/users" element={<Users />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/signin" element={<Signin />} />
        
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
               <EditProfile />
            </PrivateRoute>
          }
        />
         <Route path="/user/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
