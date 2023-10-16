import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BASE_URL from '../config';
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSubscribe , setIsSubscribe] = useState(false);
  const [subscribeDate , setSubscribeDate] = useState(0);
  const navigate = useNavigate();
 
  useEffect(()=>{
    setSubscribeDate(localStorage.getItem("subscribeDate"));  
    if (subscribeDate !== 0 && subscribeDate !== undefined) { 
      setIsSubscribe(!isDateOlderThan3Days(subscribeDate));
      console.log("subscribeDates", subscribeDate);
   } else {
      console.log("subscribeDate is undefined or null");
   }
  
  },[subscribeDate])

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  function isDateOlderThan3Days(subscribedDate) {
    // Calculate the current date
    
    if(subscribedDate === null) return true;

    const currentDate = new Date();
    
    // Calculate the date 3 days ago
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    
    // Convert the subscribedDate to a Date object (if it's not already)
    if (!(subscribedDate instanceof Date)) {
      subscribedDate = new Date(subscribedDate);
    }
    
    // Compare the subscribedDate with threeDaysAgo
    return subscribedDate < threeDaysAgo;
  }

  
  const subscribe = () => {
    axios.post(BASE_URL + '/api/subscribe' ,null ,{headers})
    .then(res => {
      localStorage.setItem('subscribeDate',res.data.subscribedDate)
      setSubscribeDate(res.data.subscribedDate);
      setIsSubscribe(true);
     return navigate("/");
    
  })
    .catch(err => console.log(err));
  }

  const unsubscribe = () => {
    
    axios.post(BASE_URL + '/api/unsubscribe' ,null,{headers})
    .then(res => {
      localStorage.setItem('subscribeDate',0)
      setSubscribeDate(res.data.subscribedDate);
     return navigate("/");
    })
    .catch(err => console.log(err))
    
  }
 
  console.log('subscribe-->',isSubscribe)
  
  const logout = () => {
    localStorage.removeItem("subscribeDate");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    return navigate("/auth");
  }

  return (
    <nav className="border-gray-200 m-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Flowbite
          </span>
        </Link>
        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isNavOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
               activeclassname="text-blue-700"
              >
                Home
              </NavLink>
            </li>
           {token && <li>
              <NavLink
                to="/create"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"
               activeclassname="text-blue-700"
              >
                AddPost
              </NavLink>
            </li>}
         {  !token && <li>
              <NavLink
                to="/auth"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"
               activeclassname="text-blue-700"
              >
                Authenticate
              </NavLink>
            </li>}

            {token && <li>
              <button onClick={logout}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"
              >
                Logout
              </button>
            </li>}

            <li>
      { token &&   <button onClick={isSubscribe ? unsubscribe :subscribe}
          className="block py-1 pl-2 pr-3 text-orange-500 border border-orange-500 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0"
        >
         {isSubscribe ? "UnSubsribe":"Subscribe"}
        </button>}

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
