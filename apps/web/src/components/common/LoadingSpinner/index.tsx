"use client";

interface LoadingSpinnerProps {
  isLoading: boolean;
  hasError: Error | null;
}

function LoadingSpinner({ isLoading, hasError }: LoadingSpinnerProps) {
  if (hasError) {
    return (
      <>
        <div className="text-red-500 text-xl font-bold text-center p-4">
          {hasError.message}
        </div>
        ;
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-green-500 border-opacity-50 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return null;
}

export default LoadingSpinner;
