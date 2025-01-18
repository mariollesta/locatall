import React from 'react';
import { AlertCircle, MapPin } from 'lucide-react';

const ErrorMessage = ({ 
  title = "¡Uy! Estamos teniendo problemillas :(", 
  message 
}) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-md max-w-md mx-auto my-4">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <MapPin className="h-4 w-4 mr-1" />
        <span>La localización puede no estar activa.</span>
      </div>
      <button
        className="mt-3 w-full bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        onClick={() => window.location.reload()}
      >
        ¡Prueba de nuevo!
      </button>
    </div>
  );
};

export default ErrorMessage;
