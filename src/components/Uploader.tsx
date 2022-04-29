import React, { useState } from 'react';
import { ReactComponent as UploadIcon } from 'assets/upload.svg';
import { getRandomKey } from 'lib/utils';
import Image from './Image';

interface UploaderProps {
  acceptType: string;
  maxFile: number;
}

export default function Uploader({ acceptType, maxFile = 5 }: UploaderProps) {
  const [images, setImages] = useState<string[]>([]);

  const readAsDataURL = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = reject; // File 객체 읽기를 실패하면 onerror 호출 -> reject 호출
      fileReader.onload = () => resolve(fileReader.result); // 에러없이 읽기를 마쳤을 때 onload 이벤트 호출
      fileReader.readAsDataURL(file); // FileReader API 로 File 객체 읽기
    });
  };

  const onChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target; // File 객체에 선택한 이미지 파일 정보가 담김
    if (!files || maxFile - images.length < files.length) {
      // eslint-disable-next-line no-alert
      alert(`최대 ${maxFile}개만 첨부할 수 있습니다`);
      return;
    }

    Promise.all(Array.from(files).map(readAsDataURL))
      .then(urls => {
        // FileReader 를 통해 DataURL 로 읽은 결과(DataURL) 업데이
        setImages(prev => [...prev, ...(urls as string[])]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex gap-2">
      <section className="image-box">
        <label
          htmlFor="fileUpload"
          className="w-full h-full flex-center cursor-pointer fill-gray-400"
        >
          <input
            hidden
            type="file"
            id="fileUpload"
            accept={acceptType}
            multiple={maxFile > 1}
            onChange={onChangeHandler}
          />
          <UploadIcon width={30} height={30} />
        </label>
      </section>
      {images?.map(img => (
        <div className="image-box" key={getRandomKey()}>
          <Image src={img} alt="uploaded" />
        </div>
      ))}
    </div>
  );
}
