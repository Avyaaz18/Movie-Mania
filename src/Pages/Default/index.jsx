import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import back from '/src/assets/img1.jpg'; 
import {auth, provider, signInWithPopup} from "/src/config/firebase"
import AlertMessage from '../../Components/warning/AlertMessage';

export default function GetStarted() {

  const [user, setUser] = useState(null);
  const [showWarning,setShowWarning] = useState(true);
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowWarning(false);
      setShowAlert(true);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const handleGetStarted = () => { 
    if (!user) {
      setShowAlert(true);
      setShowWarning(true);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="get-started-container flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${back})` }}>
      <div className="overlay absolute  top-0 left-0 bottom-0 right-0 bg-black opacity-70 z-1"></div>
      <div className="content z-10 text-center max-w-[600px] p-5 text-white rounded-xl">
      <h1 className='text-5xl mb-5'>Welcome to Movie Mania!</h1>
      <p className='text-xl mb-8'>Your one-stop destination for all movies. Explore top-rated films, latest releases, and timeless classics.</p>
      <div className='flex items-center justify-center'>
      <button type="button" className={`text-white bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 ${user?"hidden":null}`} onClick={handleGoogleSignIn}>
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
      <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
      </svg>
      Sign in with Google
      </button>
        <button type="button" className="get-started-button text-center text-whitetext-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-base px-6 py-2  me-2 mb-2 border-none cursor-pointer transition-colors duration-300 ease-in-out font-serif"  onClick={()=>handleGetStarted()}>
          Get Started <i className="fa-solid fa-chevron-right text-base"></i>
        </button>
      </div>
      {showAlert && <AlertMessage message={user?'Logged in successfully! Click "Get Started" to continue':"Please Sign-in to 'Get Started'"} setShowAlert={setShowAlert} showWarning = {showWarning} />}
      </div>
    </div>
  );
}

// export default GetStarted;
