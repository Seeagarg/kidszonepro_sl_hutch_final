import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import VideoGrid from "../Components/VideoGrid";
import { imagesApi, pre, videosApi } from "../api/api";
import axios from "axios";
import Layout from "../Components/Layout";
import Loader from "../Components/Loader";
import Carousel from "../Components/Carousel";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const HomeRoute = () => {
  const navigate = useNavigate();
  const [msisdn, setMsisdn] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  // const msisdnn = new URLSearchParams(location.search).get("msisdn");

  // useEffect(() => {
  //   navigate('/subscribe')
  //   // setMsisdn(msisdnn);
  // }, []);




  const fetchDataFromBackend = async () => {
    try {
      const res = await axios.get(`${pre}/${videosApi}`);
      const res2 = await axios.get(`${pre}/${imagesApi}`);
      setImages(res2?.data);
      setVideos(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  

  useEffect(()=>{
    fetchDataFromBackend();
  },[])

  useEffect(()=>{
    const new_user = Cookies.get('new_user_without_login')
    if(new_user == "" || !new_user || new_user == 'undefined' || new_user == null){
      navigate('/login')
    }
  },[])

  

  return (
    <>
      <Navbar />
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="py-4">
              <Carousel images={images} />
              {/* <Carousel images={images} msisdn={msisdn} /> */}
            </div>
            <div className="pb-4">
              {/* <VideoGrid videos={videos} msisdn={msisdn} /> */}
              <VideoGrid videos={videos} />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default HomeRoute;
