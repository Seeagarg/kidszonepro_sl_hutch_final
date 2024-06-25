import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { pre, randomVideosApi, videoByIdApi } from "../api/api";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import VideoGrid from "../Components/VideoGrid";
import VideoComponent from "../Components/VideoComponent";
import SubHeader from "../Components/SubHeader";
import Title from "../Components/Title";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const VideoRoute = () => {
  const { id } = useParams();
  const [msisdn,setMsisdn]=useState("");
  // const location = useLocation();
  // const msisdnn = new URLSearchParams(location.search).get('msisdn');
  const navigate=useNavigate();
  // useEffect(()=>{
  //   setMsisdn(msisdnn);
  // },[])

  // const checkSubscription=async()=>{
  //   try {
  //     const res = await axios.get(`${pre}/checkuser/${msisdn}`);
  //     if(res?.data?.status==0){
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     toast.error(error?.message);
  //   }
  // }

  console.log("on Video route")



  
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`${pre}/${videoByIdApi}/${id}`);
      console.log(res)
      setVideo(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };
  const fetchDataFromBackend = async () => {
    try {
      const res = await axios.get(`${pre}/${randomVideosApi}`);
      setVideos(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };
  
  // useEffect(()=>{
  //   checkSubscription();
  // },[msisdn,id]);

  useEffect(() => {
   
      fetchVideo();
    fetchDataFromBackend();
   
  }, [id]);
  return (
    <>
      <Navbar />
      <Layout>
        {loading ? 
            <Loader />
         : 
          <>
              <Title title={video[0]?.name} />
            <div className="py-4">
              <VideoComponent videoItem={video[0]} />
            </div>
            <SubHeader />
            <div className="py-4">
              {/* <VideoGrid videos={videos} msisdn={msisdn}/> */}
              <VideoGrid videos={videos} />
            </div>
            
          </>
        }
      </Layout>
    </>
  );
};

export default VideoRoute;
