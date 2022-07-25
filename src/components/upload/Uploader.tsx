/* eslint-disable no-alert,consistent-return */
import React from 'react';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import classnames from 'classnames';
import {
  KR_CONFIRM_DELETE,
  KR_MAX_FILE_ALERT,
  KR_MAX_MB_SIZE_ALERT,
} from 'lib/constants';
import Image from '../common/Image';
import Button from '../common/Button';

interface UploaderProps {
  uploadHandler: VoidHandler<string[]>;
  classNames?: string;
  acceptType?: string;
  preview?: boolean;
  uploadedFiles?: string[];
  uploadedNum?: number;
  maxFileSize?: number;
  maxFileNum?: number;
}

export default function Uploader({
  uploadHandler,
  classNames,
  acceptType,
  preview = false,
  uploadedFiles = [],
  uploadedNum = 0,
  maxFileSize = 1e7, // 1e7 = 10MB (1e6 = 10^6 = 1MB)
  maxFileNum = 5,
}: UploaderProps) {
  const readAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = reject; // File 객체 읽기를 실패하면 onerror 호출 -> reject 호출
      fileReader.onload = () => resolve(fileReader.result as string); // 에러없이 읽기를 마쳤을 때 onload 이벤트 호출
      fileReader.readAsDataURL(file); // FileReader API 로 File 객체 읽기
    });
  };

  const validCheck = (files: FileList) => {
    const valid = { errorMsg: '', isValid: true };
    if (maxFileNum - uploadedNum < files.length) {
      valid.errorMsg = KR_MAX_FILE_ALERT(maxFileNum);
    } else if (![...files].every(f => f.size <= maxFileSize)) {
      valid.errorMsg = KR_MAX_MB_SIZE_ALERT(maxFileSize / 1e6);
    }

    if (valid.errorMsg) valid.isValid = false;
    return valid;
  };

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target; // File 객체에 선택한 이미지 파일 정보가 담김
    if (!files) return;

    const { isValid, errorMsg } = validCheck(files);
    if (!isValid) return alert(errorMsg);

    Promise.all([...files].map(readAsDataURL))
      .then(urls => {
        uploadHandler([...uploadedFiles, ...urls]); // urls : FileReader 를 통해 DataURL 로 읽은 결과(DataURL)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteHandler = (removeIdx: number) => {
    if (window.confirm(KR_CONFIRM_DELETE)) {
      const filter = uploadedFiles.filter((_, i) => i !== removeIdx);
      uploadHandler(filter);
    }
  };

  const isShow = uploadedNum < maxFileNum;

  return (
    <section className={classnames('flex gap-4', classNames)}>
      {isShow && (
        <div className="image-box hover:bg-gray-200 transition">
          <label
            htmlFor="fileUpload"
            className="w-full h-full flex-center cursor-pointer"
          >
            <input
              hidden
              type="file"
              id="fileUpload"
              accept={acceptType}
              multiple={maxFileNum > 1}
              onChange={onChangeHandler}
            />
            <UploadIcon className="fill-gray-400" width={30} height={30} />
          </label>
        </div>
      )}
      {preview &&
        uploadedFiles?.map((object, i) => (
          <div
            className="image-box relative"
            key={object.split(',')[1].slice(0, 15)}
          >
            <Image src={object} alt="uploaded" rounded />
            <Button
              onClick={() => deleteHandler(i)}
              width="24px"
              height="24px"
              className="absolute right-1 top-1 rounded bg-black/50 hover:bg-black/70"
            >
              <CloseIcon className="fill-white" width={12} height={12} />
            </Button>
          </div>
        ))}
    </section>
  );
}
