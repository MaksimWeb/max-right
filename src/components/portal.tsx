import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: React.PropsWithChildren) {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#portal');
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className='fixed left-0 top-0 w-full h-full overflow-auto z-10 bg-[rgba(0,0,0,0.4);]'>
          {children}
        </div>,
        ref.current
      )
    : null;
}
