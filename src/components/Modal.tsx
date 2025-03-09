import React, { useCallback, useEffect, useRef } from 'react';

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, open, handleClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const internalHandleShowDialog = (): void => {
    dialogRef.current?.showModal();
  };

  const internalHandleCloseDialog = useCallback(() => {
    dialogRef.current?.close();
    handleClose();
  }, [ handleClose ]);

  useEffect(() => {
    if (open) {
      internalHandleShowDialog();
    } else {
      internalHandleCloseDialog();
    }
  }, [ internalHandleCloseDialog, open ]);

  const handleDialogContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (e.target === dialogContentRef.current) {
      internalHandleCloseDialog();
    }
  };

  return (
    <dialog
      ref={ dialogRef }
      onCancel={ handleClose }
      className='bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm margin-0'
    >
      <div
        ref={ dialogContentRef }
        onClick={ handleDialogContentClick }
        className='fixed inset-0 flex items-center justify-center'>
        <div className='bg-white rounded-xl shadow-lg max-w-max w-full mx-4 border border-gray-200 relative h-fit'>
          <button
            onClick={ internalHandleCloseDialog }
            className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer absolute right-3 top-3 z-1'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='red'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={ 2 }
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <p>
            {children}
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;