import { useEffect, useState } from 'react';

interface UseDebounceProps {
  term: string;
  delay: number;
}

// reference: https://usehooks.com/useDebounce/
export default function useDebounce({ term, delay }: UseDebounceProps) {
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, delay);

    return () => clearTimeout(timer);
  }, [term, delay]);

  return [debouncedTerm] as const;
}
