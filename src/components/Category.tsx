import classnames from 'classnames';
import React from 'react';
import { KR_COMMUNITY } from 'lib/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectCurrentCategory,
} from 'modules/community/communitySelector';
import { changeCategory } from 'modules/community/communitySlice';

export default function Category() {
  const list = useSelector(selectCategories);
  const current = useSelector(selectCurrentCategory);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <header className="text-xl font-bold ml-6 pt-9">{KR_COMMUNITY}</header>
      <section className="flex gap-1 flex-nowrap overflow-x-scroll p-5 font-medium text-sm">
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
            onClick={() => dispatch(changeCategory(cpk))}
          >
            <span>{categoryName}</span>
          </button>
        ))}
      </section>
    </div>
  );
}
