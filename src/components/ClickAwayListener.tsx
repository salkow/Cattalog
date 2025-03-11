import React, { useEffect, useRef } from 'react';

interface IClickAwayListenerProps {
    children: React.ReactNode;
    onClickAway: () => void;
    enabled?: boolean
}

const ClickAwayListener: React.FC<IClickAwayListenerProps> = function ({ children, onClickAway, enabled = true }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      console.log('enabled', enabled);
      if (enabled && ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        console.log('click away');
        onClickAway();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };

  }, [ onClickAway, enabled ]);

  return (
    <div
      className='h-full w-ful'
      ref={ ref }>
      {children}
    </div>
  );
};


export default ClickAwayListener;