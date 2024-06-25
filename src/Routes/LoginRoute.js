import React, { useState,useEffect } from "react";
// import Navbar from "../Components/Navbar";
import axios from "axios";
// import { pre } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Loader from "../Components/Loader";
import {useSelector} from 'react-redux'
import Lottie from 'lottie-react';
import front from '../Animations/front.json'
import Layout from '../Layouts/Layout'
import Cookies from 'js-cookie'


const LoginRoute = () => {
  const navigate=useNavigate();
  const {lang} = useSelector((state)=>state.LanguageSlice)

  const [number, setNumber] = useState("");
  const [loading,setLoading]=useState(false);


  


//  console.log(number && Number(number[0]) !== 9)
  


    const checkUser=async()=>{
      let msisdn = number;

      if (typeof msisdn !== 'string') {
        msisdn = String(msisdn);
      }
  
     
      if (msisdn.substring(0, 2) !== '94') {
        
        if (msisdn[0] === '0') {
          msisdn = msisdn.slice(1);
        }
       
        msisdn = '94' + msisdn;
      }
  
      console.log(msisdn, "Formatted Number");
  
      console.log(msisdn,"Number-------------------")



        try{
          const res = await axios.get('https://slcallback.kidszonepro.com/checkuser',{
            params:{
              msisdn:msisdn,
              service:"Kidszonepro"
            }
          })
    
          if(res.data.status == 0){
            // navigate('/login')
            Cookies.remove('kidszonepro_user')
            toast.warn("Subscription Expired!!")
            // Cookies.remove('user')
            // window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3DdQ%3D%3D')
          }
          else{
            Cookies.set('kidszonepro_user',msisdn,{expires:1})
            Cookies.set('new_user_without_login','no_login',{expires:1});
           setTimeout(()=>{
            navigate('/home')
           },2000)
          }
          
        }
        catch(err){
          console.log(err)
        }
      }
    
      // useEffect(() => {
      //   // checkUser()
      //   console.log(window.location.href)
      // }, [])





  const submitHandler = async (e) => {
    e.preventDefault();
    checkUser()
    // if (number.trim().length > 0) {
    //   try {
    //     setLoading(true);
    //     const res = await axios.get(`${pre}/checkuser/${number}`);
    //     if(res?.data?.status==1){
    //         setLoading(false);
    //         localStorage.setItem('number',number);
    //         // window.location.href = `/redirect?msisdn=${number}`;
    //         navigate('/')
    //     }
    //     else{
    //         setLoading(false);
    //         toast.error("You are not subscribed!");
    //     }
    //   } catch (error) {
    //     setLoading(false);
    //     toast.error(error?.message);
    //   }
    // } else {
    //   toast.error("Number cannot be empty!");
    // }
  };

  const subscribeHandler=()=>{
    window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3DdQ%3D%3D')
  }


  return (
    <Layout>
      {/* <Navbar /> */}
      <div className="mt-12 w-full  flex justify-center items-center">
        <div className="p-10 bg-[black]  shadow-inner shadow-[#fff]  w-2/4 flex  flex-col items-center gap-4 sm:flex-row sm:gap-0   rounded-lg max-[800px]:w-3/4">
        <div className="w-[40%] h-full flex justify-center">
          <Lottie
            animationData={front}
            className="w-[90%]"
          />
        </div>
          <form className=" sm:w-[40%] max-w-sm mx-auto flex flex-col justify-center " onSubmit={submitHandler}>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-white "
              >
                {lang == 'en' ?"Your Number" : lang == 'sin' ? 'ඔබේ අංකය' : lang == 'ta' ? 'உங்கள் எண்' :""}
              </label>
              <input
                type="number"
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="9478*******"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-white my-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
              onClick={submitHandler}
            >
              {lang == 'en' ?"Login" : lang == 'sin' ? 'ඇතුල් වන්න' : lang == 'ta' ? 'உள்நுழைய' :"Ingia"}
            </button>
            <p className="text-white  text-sm font-medium ">{lang == 'en' ? 'If not subscribed Click to Subscribe:' : lang == 'ta' ? 'குழுசேரவில்லை என்றால், குழுசேர கிளிக் செய்யவும்:': lang == 'sin' ? 'දායක වී නොමැති නම් දායක වීමට ක්ලික් කරන්න:':''}</p>
            <button
              disabled={loading}
              className="text-white my-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
              onClick={subscribeHandler}
            >
              {lang == 'en' ?"Subscribe" : lang == 'sin' ? 'දායක වන්න' : lang == 'ta' ? 'பதிவு' :"Ingia"}
            </button>
          </form>
          {/* <div>
            {loading && <Loader />}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default LoginRoute;
