import React, { useEffect, useState } from 'react';
import { KR_CONTENT_HOLDER } from 'lib/constants';
import classnames from 'classnames';
import useDebounce from 'hooks/useDebounce';

interface TextAreaProps {
  onChange: VoidHandler<string>;
  className?: string;
  placeholder?: string;
  delay?: number;
  maxLength?: number;
}

export default function TextArea({
  onChange,
  className,
  maxLength,
  delay = 400,
  placeholder = KR_CONTENT_HOLDER,
}: TextAreaProps) {
  const [term, setTerm] = useState('');
  const [debouncedTerm] = useDebounce({ term, delay });

  useEffect(() => {
    onChange(debouncedTerm);
  }, [debouncedTerm, onChange]);

  const classes = classnames(
    'w-full h-full whitespace-pre-line outline-none resize-none placeholder-gray04 font-medium',
    className,
  );

  return (
    <textarea
      className={classes}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={e => setTerm(e.target.value)}
    />
  );
}
