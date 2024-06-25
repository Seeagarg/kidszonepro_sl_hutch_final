import React,{useEffect,useState} from "react";
import classes from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const navigate=useNavigate(); 
    const [dropDown,setDropDown] = useState(false)

    const number = Cookies.get('kidszonepro_user');

    const checkUser=async()=>{
        // console.log('checkuser')
        if(!number || number == undefined || number == null || number == " "){
          navigate('/login')
        }


        try{
          const res = await axios.get('https://slcallback.kidszonepro.com/checkuser',{
            params:{
              msisdn:number,
              service:"Kidszonepro"
            }
          })
    
          if(res.data.status == 0){
            Cookies.remove('kidszonepro_user')
            // Cookies.remove('user')
            navigate('/login')
          }
          else{
            // navigate('/home')
          }
          
        }
        catch(err){
          console.log(err)
        }
      }
    
      // useEffect(() => {
      //   checkUser()
      // }, [])

      const handleDeactivate=async()=>{
        let msisdn = Cookies.get('kidszonepro_user');
        const data = {
          msisdn : msisdn,
          serviceName : "Kidszonepro"
        }
        setDropDown(false)
    
        try{
    
          const res = await axios.post('https://slcallback.kidszonepro.com/deactivate-user',data)
        
        console.log(res)
        if(res.data.code == 0){
          Cookies.remove('kidszonepro_user')
          Cookies.remove('user')
          Cookies.remove('new_user_without_login');

          window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Dew%3D%3D')
          // navigate('/login')
        }
        else{
          toast.error("Something Went Wrong")
          navigate('/home')
        }
    
        }catch(err){
          toast.error("Something Went Wrong")
          navigate('/home')
        }
        
    
    
      }
    

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo_container}>
        <Link>
          <img src="/assets/images/toonflix.png" alt="Logo" className={classes.image} onClick={()=>navigate("/demo")}/>
        </Link>


        <div className="flex flex-col">
<button id="dropdownDefaultButton" onClick={()=>setDropDown(!dropDown)} class="text-[16px] ml-4 bg-gray-300/20 skew-y-1 text-white  hover:scale-110 shadow-lg hover:shadow-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 mr-4 " type="button">My Account 
</button>

{
  dropDown &&
  <div id="dropdown" class="mt-12 absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDeactivate}>Deactivate </Link>
      </li>
      
    </ul>
</div>
}

</div>


      </div>
      <ToastContainer/>
    </nav>
  );
};

export default Navbar;