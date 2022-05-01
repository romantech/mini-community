/* eslint-disable no-alert */
import React, { useCallback, useEffect } from 'react';
import {
  KR_COMPLETE,
  KR_COMPLETE_COMPOSE,
  KR_CONFIRM_LEAVE_MSG,
  KR_NEWPOST,
  KR_RETRY_LATER,
} from 'lib/constants';
import Back from 'components/common/Back';
import Button from 'components/common/Button';
import { useSelector } from 'react-redux';
import {
  selectCurrentCategoryId,
  selectNewPost,
  selectNewPostCanSubmit,
  selectNewPostImages,
  selectNonFixedCategory,
  selectUploadedNum,
} from 'modules/community/community.selector';
import { clearNewPost, setNewPost } from 'modules/community/community.slice';
import { useAppDispatch } from 'modules/store';
import Uploader from 'components/upload/Uploader';
import Select from 'components/form/Select';
import TextInput from 'components/form/TextInput';
import TextArea from 'components/form/TextArea';
import { submitNewPost } from 'modules/community/community.thunk';
import { useNavigate } from 'react-router-dom';
import siteUrl from 'routes/url';
import UploadStatus from 'components/upload/UploadStatus';

export default function Compose() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectNonFixedCategory); // 전체글&인기글 제외
  const currentCategoryId = useSelector(selectCurrentCategoryId);
  const uploadedImages = useSelector(selectNewPostImages);
  const uploadedNum = useSelector(selectUploadedNum);
  const composedPost = useSelector(selectNewPost);
  const canSubmit = useSelector(selectNewPostCanSubmit);

  const leavePage = useCallback(() => {
    dispatch(clearNewPost());
    navigate(siteUrl.community.list, { replace: true });
  }, [dispatch, navigate]);

  // createAsyncThunk 는 래핑된 프로미스를 반환함
  // async / await 를 쓰고 싶다면, unwrap() 메서드로 원본 프로미스에 접근하면 됨
  // reference : https://github.com/reduxjs/redux-toolkit/issues/1890#issuecomment-1004741945
  const submitHandler = useCallback(async () => {
    try {
      await dispatch(submitNewPost(composedPost)).unwrap();
      alert(KR_COMPLETE_COMPOSE);
      leavePage();
    } catch (e) {
      console.log(e);
      alert(KR_RETRY_LATER);
    }
  }, [composedPost, dispatch, leavePage]);

  const categoryHandler = useCallback(
    (category: Category) => {
      // 글쓰기 제출 엔트리엔 categoryCode 없으므로 제외
      const excludeCategoryCode = { ...category };
      delete excludeCategoryCode.categoryCode;
      dispatch(setNewPost(excludeCategoryCode));
    },
    [dispatch],
  );

  const titleHandler = useCallback(
    (title: string) => dispatch(setNewPost({ title })),
    [dispatch],
  );

  const contentHandler = useCallback(
    (content: string) => dispatch(setNewPost({ content })),
    [dispatch],
  );

  const uploadImageHandler = useCallback(
    (imageUrl: string[]) => dispatch(setNewPost({ imageUrl })),
    [dispatch],
  );

  useEffect(() => {
    return () => leavePage();
  }, [leavePage]);

  // 888은 전체글 999는 인기글이므로 888이하면 OK
  const defaultValues = currentCategoryId < 888 ? currentCategoryId : undefined;
  const maxFilesNum = 6;

  return (
    <div className="divide-y border-b text-sm leading-6 bg-white">
      <header className="h-14 flex justify-between items-center p-2">
        <Back className="p-4" confirmMsg={KR_CONFIRM_LEAVE_MSG} />
        <h2 className="font-bold">{KR_NEWPOST}</h2>
        <Button
          text={KR_COMPLETE}
          width="64px"
          height="36px"
          disabled={!canSubmit}
          onClick={submitHandler}
          rounded
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
      <div className="flex items-center h-52 mb-3">
        <TextArea className="p-5" onChange={contentHandler} />
      </div>
      <div className="p-5 border-t-white">
        <div className="overflow-x-auto no-scrollbar">
          <Uploader
            acceptType="image/*"
            maxFilesNum={maxFilesNum}
            uploadedFiles={uploadedImages || undefined}
            uploadedNum={uploadedNum}
            uploadHandler={uploadImageHandler}
            preview
          />
        </div>
        <UploadStatus
          maxFilesNum={maxFilesNum}
          uploadedNum={uploadedNum}
          className="mt-4"
        />
      </div>
    </div>
  );
}
