import classnames from 'classnames';
import React from 'react';

interface CategoryProps {
  categories: Category[];
  currentId: CategoryId;
  onClick: VoidHandler<CategoryId>;
}

export default function Category({
  categories,
  currentId,
  onClick,
}: CategoryProps) {
  return (
    <section className="flex gap-1 flex-nowrap overflow-x-auto mobile:no-scrollbar px-5 py-4 font-medium text-sm text-gray05">
      {categories.map(({ categoryId: id, categoryName }) => (
        <button
          key={id}
          className={classnames(
            'flex-center h-9 min-w-fit border border-gray02 rounded-3xl py-3 px-4 transition-all duration-500 outline-none',
            {
              'sm:hover:bg-gray-100': id !== currentId,
              'bg-primary01 text-white border-primary01': id === currentId,
            },
          )}
          type="button"
          onClick={() => id !== currentId && onClick(id)}
        >
          <span>{categoryName}</span>
        </button>
      ))}
    </section>
  );
}
