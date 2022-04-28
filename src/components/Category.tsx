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
    <section className="flex gap-1 flex-nowrap overflow-x-scroll px-5 py-4 font-medium text-sm text-gray05">
      {categories.map(({ categoryId: id, categoryName }) => (
        <button
          key={id}
          className={classnames(
            'flex-center h-9 min-w-fit border border-gray02 rounded-[20px] py-3 px-4 transition',
            {
              'hover:bg-gray-100': id !== currentId,
              'bg-primary01 text-white border-transparent': id === currentId,
            },
          )}
          type="button"
          onClick={() => onClick(id)}
        >
          <span>{categoryName}</span>
        </button>
      ))}
    </section>
  );
}
