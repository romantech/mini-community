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
import TextInput from '../components/TextInput';

export default function Compose() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectNonFixedCategory); // 전체글&인기글 제외
  const currentCategoryId = useSelector(selectCurrentCategoryId);

  const completeHandler = () => {};
  const categoryHandler = (category: Category) => {
    dispatch(setNewPost(category));
  };
  const titleHandler = (title: string) => {
    dispatch(setNewPost({ title }));
  };

  // 888은 전체글 999는 인기글이므로 888이하면 OK
  const defaultValues = currentCategoryId < 888 ? currentCategoryId : undefined;

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
          defaultValues={defaultValues}
          className="font-bold"
          onChange={categoryHandler}
        />
      </div>
      <div className="h-11 flex items-center p-5">
        <TextInput onChange={titleHandler} />
      </div>
    </div>
  );
}
