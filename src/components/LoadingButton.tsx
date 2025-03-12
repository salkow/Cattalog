import React from 'react';
import Spinner from './Spinner';

interface ILoadingButtonProps {
  loading: boolean;
  onClick: () => unknown;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>['className'];
}

const LoadingButton: React.FC<ILoadingButtonProps> = function ({ loading, children, onClick, className, startIcon }) {
  return (
    <button
      onClick={ onClick }
      disabled={ loading }
      className={ `text-white font-bold py-2 px-10 rounded-full w-xs
      shadow-lg gap-4 items-center justify-center
      border-gray-600 border
      ${ loading ? 'cursor-not-allowed bg-slate-500' : 'cursor-pointer bg-blue-500 hover:bg-blue-600' } 
      ${ loading || startIcon ? 'flex' : '' }
      ${ className ? className : '' }` }>
      {
        loading ? (
          <Spinner className='size-[20px]'/>
        ) : (
          <>
            { startIcon }
          </>
        )
      }
      {children}
    </button>
  );
};

export default LoadingButton;