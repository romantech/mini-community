import React from 'react';
import { ReactComponent as UploadIcon } from 'assets/upload.svg';
import Image from './Image';

interface UploaderProps {
  acceptType: string;
  uploadHandler: VoidHandler<UploadFileType[]>;
  preview: boolean;
  classNames?: string;
  uploadedNum?: number;
  uploadedFiles?: UploadFileType[];
  maxFile: number;
}

export default function Uploader({
  acceptType,
  uploadHandler,
  preview = false,
  classNames,
  uploadedNum = 0,
  uploadedFiles = [],
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
        // FileReader 를 통해 DataURL 로 읽은 결과(DataURL) 업데이트
        const newFiles: UploadFileType[] = urls.map((object, i) => ({
          id: uploadedNum + (i || 1),
          object,
        }));

        uploadHandler(newFiles);
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="flex gap-2">
      <div className="image-box hover:bg-gray-200">
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
      {preview &&
        uploadedFiles?.map(({ object, id }) => (
          <div className="image-box" key={`upload-${id}`}>
            <Image src={object} alt="uploaded" />
          </div>
        ))}
    </section>
  );
}
