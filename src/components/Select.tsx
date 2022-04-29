import React, { useRef } from 'react';
import classnames from 'classnames';

// import { ReactComponent as ArrowIcon } from 'assets/arrow-down.svg';

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
  const selectRef = useRef(null);
  const selectHandler = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const category = options[Number(target.value) - 1];
    onChange(category);
  };
  const classes = classnames(
    'appearance-none outline-none cursor-pointer bg-arrow-down pr-4',
    className,
  );

  return (
    <div className="flex items-center">
      <select
        ref={selectRef}
        className={classes}
        onChange={selectHandler}
        defaultValue={defaultValues}
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
