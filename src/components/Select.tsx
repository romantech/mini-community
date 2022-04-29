import React, { useEffect } from 'react';
import classnames from 'classnames';

interface SelectProps<T> {
  options: T[];
  onChange: VoidHandler<T>;
  defaultValues?: number | string;
  className?: string;
}

export default function Select<T extends Category>({
  options,
  defaultValues,
  onChange,
  className,
}: SelectProps<T>) {
  const selectHandler = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(target.value) - 1; // categoryId 는 1부터 시작이므로 - 1
    onChange(options[idx]);
  };

  useEffect(() => {
    const idx = Number(defaultValues) - 1 || 0; // defaultValue 없으면 첫번째 option dispatch
    onChange(options[idx]);
  }, [defaultValues, onChange, options]);

  const classes = classnames(
    'appearance-none outline-none bg-arrow-down pr-4',
    className,
  );

  return (
    <div className="flex items-center">
      <select
        className={classes}
        onChange={selectHandler}
        defaultValue={defaultValues} // 해당하는 value 없으면 자동으로 첫번째 options 으로 선택됨
      >
        {options?.map(option => (
          <option value={option.categoryId} key={option.categoryId}>
            {option.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
}
