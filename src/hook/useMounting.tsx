import { useEffect } from 'react';
// use call mounting
export const useMounting = (fn: VoidFunction): void =>
  useEffect(() => {
    fn();
  }, []);
