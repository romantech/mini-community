import classnames from 'classnames';
import React from 'react';

interface CategoryProps {
  list: Category[];
  current: CategoryPk;
  clickHandler: VoidHandler<CategoryPk>;
}

export default function Category({
  list,
  current,
  clickHandler,
}: CategoryProps) {
  return (
    <section className="flex gap-1 flex-nowrap overflow-x-scroll px-5 py-4 font-medium text-sm">
      {list.map(({ categoryPk: cpk, categoryName }) => (
        <button
          key={cpk}
          className={classnames(
            'h-9 min-w-fit border border-gray02 rounded-2xl py-3 px-4 text-gray05 grid place-content-center transition',
            {
              'hover:bg-gray-100': cpk !== current,
              'bg-primary01 text-white border-transparent': cpk === current,
            },
          )}
          type="button"
          onClick={() => clickHandler(cpk)}
        >
          <span>{categoryName}</span>
        </button>
      ))}
    </section>
  );
}
