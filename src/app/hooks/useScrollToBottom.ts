import { useCallback, RefObject } from 'react';

export function useScrollToBottom(ref: RefObject<HTMLElement>) {
  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      const { scrollHeight, clientHeight } = ref.current;
      ref.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [ref]);

  return scrollToBottom;
} 