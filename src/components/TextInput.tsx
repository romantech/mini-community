import React, { useEffect, useState } from 'react';
import { KR_TITLE_HOLDER } from 'lib/constants';
import useDebounce from 'hooks/useDebounce';

interface TextInputProps {
  onChange: VoidHandler<string>;
  placeholder?: string;
  maxLength?: number;
}

export default function TextInput({
  onChange,
  maxLength = 50, // 제목은 국문 기준 50자를 넘기지 않는게 좋음
  placeholder = KR_TITLE_HOLDER,
}: TextInputProps) {
  const [term, setTerm] = useState('');
  const [debouncedTerm] = useDebounce({ term, delay: 300 });

  useEffect(() => {
    if (debouncedTerm) onChange(debouncedTerm);
  }, [debouncedTerm, onChange]);

  return (
    <div className="w-full">
      <input
        placeholder={placeholder}
        maxLength={maxLength}
        type="text"
        className="outline-none w-full"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
    </div>
  );
}
