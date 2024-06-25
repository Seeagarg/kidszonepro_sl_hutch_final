import React from "react";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import HomeRoute from "./Routes/HomeRoute";
import VideoRoute from "./Routes/VideoRoute";
import LoginRoute from "./Routes/LoginRoute";
import SubscriptionPage from "./Routes/SubscriptionPage";
import OtpValidationPage from "./Routes/OtpValidationPage";
import Cookies from 'js-cookie';

const RedirectToExternalOrHome = ({ url }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if the cookie exists
    const user = Cookies.get('user')
    const new_user = Cookies.get('new_user_without_login')
    if (!user || user == null || user == undefined || user == " ") {
      Cookies.set('user','subscribed')
      Cookies.set('new_user_without_login','no_login',{expires:1});
      window.location.href = url;
    } else if( user == 'subscribed'  ) {
      navigate('/home');
    }
  }, [navigate, url]);

  return null;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginRoute />
    },
    {
      path: "/",
      element: <RedirectToExternalOrHome url={`http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3DdQ%3D%3D`} />, // Redirect from "/"
    },
    {
      path: "/home",
      element: <HomeRoute />,
    },
    {
      path: "/video/:id",
      element: <VideoRoute />
    },
    {
      path: "/subscribe",
      element: <SubscriptionPage />,
    },
    {
      path: "/otp-validation",
      element: <OtpValidationPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
