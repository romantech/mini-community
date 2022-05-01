import React from 'react';
import { ReactComponent as PictureIcon } from 'assets/icons/picture.svg';
import classnames from 'classnames';
import { KR_FILE_TYPE_IMG } from 'lib/constants';

interface UploadStatusProps {
  maxFileNum: number;
  uploadedNum: number;
  className?: string;
  fileTypeString?: FileTypeString;
}

export default function UploadStatus({
  maxFileNum,
  uploadedNum,
  className,
  fileTypeString = KR_FILE_TYPE_IMG,
}: UploadStatusProps) {
  const uploadStatusTxt = `${fileTypeString}(${uploadedNum}/${maxFileNum})`;

  const classes = classnames(
    'flex-center gap-0.5 bg-primary02 text-primary01 rounded-md w-[89px] h-8',
    className,
  );

  return (
    <div className={classes}>
      <PictureIcon className="fill-primary01" />
      <span className="text-xs font-bold">{uploadStatusTxt}</span>
    </div>
  );
}
