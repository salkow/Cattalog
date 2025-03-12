import React, { useCallback, useEffect, useRef } from 'react';

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, open, handleClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<'down' | 'move' | 'up' | undefined>(undefined);

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
    if (isDragging.current === 'move') {
      e.preventDefault();
      isDragging.current = 'up';
      return;
    }
    if (e.target === dialogContentRef.current) {
      internalHandleCloseDialog();
    }
  };

  return (
    <dialog
      ref={ dialogRef }
      onCancel={ handleClose }
      onPointerMove={ () => {
        if (isDragging.current === 'down') {
          isDragging.current = 'move';
        } }
      }
      onPointerUp={ () => {
        if (isDragging.current !== 'move') {
          isDragging.current = 'up';
        }
      } }
      onPointerDown={ (e)=> {
        if (e.target !== dialogContentRef.current) {
          isDragging.current = 'down';
        }
      } }
      className='bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm margin-0 rounded-xl'
    >
      <div
        ref={ dialogContentRef }
        onClick={ handleDialogContentClick }
        className='fixed inset-0 flex items-center justify-center'>
        <div className='rounded-xl shadow-lg max-w-max w-full mx-4 relative h-fit max-h-screen'>
          <button
            autoFocus={ false }
            onClick={ internalHandleCloseDialog }
            className='cursor-pointer absolute right-3 top-3 z-2 outline-none'
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
          <div>
            {children}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;