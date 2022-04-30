import React from 'react';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { getRandomKey } from 'lib/utils';
import classnames from 'classnames';
import Image from './Image';
import Button from './Button';

interface UploaderProps {
  acceptType: string;
  uploadHandler: VoidHandler<string[]>;
  preview: boolean;
  classNames?: string;
  uploadedFiles?: string[];
  uploadedNum?: number;
  maxFile?: number;
}

export default function Uploader({
  acceptType,
  uploadHandler,
  preview = false,
  classNames,
  uploadedFiles = [],
  uploadedNum = 0,
  maxFile = 5,
}: UploaderProps) {
  const readAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = reject; // File 객체 읽기를 실패하면 onerror 호출 -> reject 호출
      fileReader.onload = () => resolve(fileReader.result as string); // 에러없이 읽기를 마쳤을 때 onload 이벤트 호출
      fileReader.readAsDataURL(file); // FileReader API 로 File 객체 읽기
    });
  };

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target; // File 객체에 선택한 이미지 파일 정보가 담김
    if (!files || maxFile - uploadedNum < files.length) {
      // eslint-disable-next-line no-alert
      alert(`최대 ${maxFile}개만 첨부할 수 있습니다`);
      return;
    }

    Promise.all([...files].map(readAsDataURL))
      .then(urls => {
        uploadHandler([...uploadedFiles, ...urls]); // urls : FileReader 를 통해 DataURL 로 읽은 결과(DataURL)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteHandler = (removeIdx: number) => {
    const filter = uploadedFiles.filter((_, i) => i !== removeIdx);
    uploadHandler(filter);
  };

  const isShowUploader = uploadedNum < maxFile;

  return (
    <section className={classnames('flex gap-2', classNames)}>
      {isShowUploader && (
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
              multiple={maxFile > 1}
              onChange={onChangeHandler}
            />
            <UploadIcon className="fill-gray-400" width={30} height={30} />
          </label>
        </div>
      )}
      {preview &&
        uploadedFiles?.map((object, i) => (
          <div className="image-box relative" key={getRandomKey(i)}>
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
