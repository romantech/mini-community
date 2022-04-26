import classnames from 'classnames';
import React from 'react';

interface CategoryProps {
  categories: Category[];
  clickHandler: VoidHandler<CategoryPk>;
}

export default function Category({ categories, clickHandler }: CategoryProps) {
  return (
    <div>
      <h1 className="text-xl font-bold ml-6 pt-9">커뮤니티</h1>
      <section className="flex gap-1 flex-nowrap overflow-x-scroll p-5">
        {categories.map(({ categoryPk, categoryName }) => (
          <button
            key={categoryPk}
            className={classnames(
              'h-9 min-w-fit border border-gray02 rounded-2xl py-3 px-4 font-medium text-sm text-gray05 grid place-content-center',
              { 'bg-primary01 text-white border-none': categoryPk === 0 }, // 전체
            )}
            type="button"
            onClick={() => clickHandler(categoryPk)}
          >
            <span>{categoryName}</span>
          </button>
        ))}
      </section>
    </div>
  );
}
