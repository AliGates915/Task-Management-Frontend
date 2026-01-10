import React from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ErrorAlert = ({ message, onDismiss, retryAction }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
          <div className="mt-2 flex space-x-3">
            {retryAction && (
              <button
                onClick={retryAction}
                className="text-sm font-medium text-red-700 hover:text-red-600"
              >
                Try again
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-sm font-medium text-red-700 hover:text-red-600"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto pl-3"
          >
            <XMarkIcon className="h-5 w-5 text-red-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;