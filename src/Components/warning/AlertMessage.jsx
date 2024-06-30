import React from 'react';

function AlertMessage({ message, setShowAlert, showWarning }) {
  return (
    <div className="absolute bottom-4 left-4 z-50 bg-red-100 border border-red-200 rounded text-red-800 text-sm p-4 flex justify-between">
      <div className='flex items-center justify-center'>
      <div className={`${showWarning?"":"hidden"} `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        </div>
        <p className='mr-1'>
          <span className={`font-bold ${showWarning?"":"hidden"}`}><span>Warning:</span></span>
          {message}
        </p>
      </div>
      <div onClick={() => setShowAlert(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}

export default AlertMessage;
