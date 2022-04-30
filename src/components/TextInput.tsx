import React, { useEffect, useState } from 'react';
import { KR_TITLE_HOLDER } from 'lib/constants';
import useDebounce from 'hooks/useDebounce';
import classnames from 'classnames';

interface TextInputProps {
  onChange: VoidHandler<string>;
  className?: string;
  delay?: number;
  placeholder?: string;
  maxLength?: number;
}

export default function TextInput({
  onChange,
  className,
  delay = 400,
  maxLength = 50, // 제목은 국문 기준 50자를 넘기지 않는게 좋음
  placeholder = KR_TITLE_HOLDER,
}: TextInputProps) {
  const [term, setTerm] = useState('');
  const [debouncedTerm] = useDebounce({ term, delay });

  useEffect(() => {
    onChange(debouncedTerm);
  }, [debouncedTerm, onChange]);

  const classes = classnames(
    'w-full h-full outline-none font-medium placeholder-gray04',
    className,
  );

  return (
    <input
      placeholder={placeholder}
      maxLength={maxLength}
      type="text"
      className={classes}
      value={term}
      onChange={e => setTerm(e.target.value)}
    />
  );
}
