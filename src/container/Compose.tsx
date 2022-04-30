/* eslint-disable no-alert */
import React from 'react';
import {
  KR_COMPLETE,
  KR_COMPLETE_COMPOSE,
  KR_COMPOSE_LEAVE_MSG,
  KR_NEWPOST,
  KR_RETRY_LATER,
} from 'lib/constants';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import {
  selectCurrentCategoryId,
  selectNewPost,
  selectNewPostCanSubmit,
  selectNewPostImages,
  selectNonFixedCategory,
  selectUploadedNum,
} from 'modules/community/communitySelector';
import { clearNewPost, setNewPost } from 'modules/community/communitySlice';
import { useAppDispatch } from 'modules/store';
import Uploader from 'components/Uploader';
import Select from 'components/Select';
import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import { submitNewPost } from 'modules/community/communityThunk';
import siteUrl from 'routes/url';
import { useNavigate } from 'react-router-dom';

export default function Compose() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectNonFixedCategory); // 전체글&인기글 제외
  const currentCategoryId = useSelector(selectCurrentCategoryId);
  const uploadedImages = useSelector(selectNewPostImages);
  const uploadedNum = useSelector(selectUploadedNum);
  const composedPost = useSelector(selectNewPost);
  const canSubmit = useSelector(selectNewPostCanSubmit);

  const completeHandler = async () => {
    try {
      // createAsyncThunk 는 래핑된 프로미스를 반환함
      // async / await 를 쓰고 싶다면, unwrap() 메서드로 원본 프로미스에 접근하면 됨
      // reference : https://github.com/reduxjs/redux-toolkit/issues/1890#issuecomment-1004741945
      await dispatch(submitNewPost(composedPost)).unwrap();
      dispatch(clearNewPost());
      navigate(siteUrl.community.list, { replace: true });
      alert(KR_COMPLETE_COMPOSE);
    } catch (e) {
      console.log(e);
      alert(KR_RETRY_LATER);
    }
  };
  const categoryHandler = (category: Category) => {
    dispatch(setNewPost(category));
  };
  const titleHandler = (title: string) => {
    dispatch(setNewPost({ title }));
  };

  const contentHandler = (content: string) => {
    dispatch(setNewPost({ content }));
  };

  const uploadImageHandler = (newFiles: UploadFileType[]) => {
    const oldFiles = uploadedImages ?? [];
    const images = [...oldFiles, ...newFiles];
    dispatch(setNewPost({ images }));
  };

  // 888은 전체글 999는 인기글이므로 888이하면 OK
  const defaultValues = currentCategoryId < 888 ? currentCategoryId : undefined;

  return (
    <div className="divide-y border-b text-sm leading-6">
      <header className="h-14 flex justify-between items-center p-2">
        <BackButton className="p-4" confirmMsg={KR_COMPOSE_LEAVE_MSG} />
        <h2 className="font-bold">{KR_NEWPOST}</h2>
        <Button
          text={KR_COMPLETE}
          width="64px"
          height="36px"
          disabled={!canSubmit}
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
      <div className="flex items-center h-11 px-5">
        <TextInput onChange={titleHandler} maxLength={100} />
      </div>
      <div className="flex items-center h-52 mb-9">
        <TextArea className="p-5" onChange={contentHandler} />
      </div>
      <div className="p-5 overflow-x-auto border-t-white">
        <Uploader
          acceptType="image/*"
          maxFile={6}
          uploadedFiles={uploadedImages}
          uploadedNum={uploadedNum}
          uploadHandler={uploadImageHandler}
          preview
        />
      </div>
    </div>
  );
}
