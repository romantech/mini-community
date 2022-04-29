import React from 'react';
import { KR_COMPLETE, KR_NEWPOST } from 'lib/constants';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import {
  selectCurrentCategoryId,
  selectNonFixedCategory,
} from 'modules/community/communitySelector';
import Select from 'components/Select';
import { setNewPost } from 'modules/community/communitySlice';
import { useAppDispatch } from 'modules/store';

export default function Compose() {
  const dispatch = useAppDispatch();
  const completeHandler = () => {};
  const categories = useSelector(selectNonFixedCategory);
  const currentCategoryId = useSelector(selectCurrentCategoryId);

  const selectHandler = (category: Category) => {
    dispatch(setNewPost(category));
  };

  return (
    <div className="flex flex-col divide-y border-b text-sm">
      <header className="h-14 flex justify-between items-center p-2">
        <BackButton className="p-4" />
        <h2 className="font-bold">{KR_NEWPOST}</h2>
        <Button
          text={KR_COMPLETE}
          width="64px"
          height="36px"
          onClick={completeHandler}
        />
      </header>
      <div className="h-11 flex items-center p-5">
        <Select<Category>
          options={categories}
          defaultValues={currentCategoryId}
          className="font-bold"
          onChange={selectHandler}
        />
      </div>
    </div>
  );
}
