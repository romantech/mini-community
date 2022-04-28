import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'modules/store';
import {
  addLikedPost,
  removeLikedPost,
} from 'modules/community/communitySlice';
import { ReactComponent as ThumbIcon } from 'assets/thumb.svg';
import { ReactComponent as ThumbFilledIcon } from 'assets/thumb-filled.svg';
import { ReactComponent as TalkIcon } from 'assets/talk.svg';
import { selectCurrentPostWasLiked } from 'modules/community/communitySelector';

interface InteractiveStatProps {
  post: PostDetail;
  className?: string;
}

export default function InteractiveStat({
  post,
  className,
}: InteractiveStatProps) {
  const dispatch = useAppDispatch();
  const isLike = useSelector(selectCurrentPostWasLiked);

  const renderList = [
    {
      icon: isLike ? <ThumbFilledIcon width={20} height={20} /> : <ThumbIcon />,
      count: post.likeCount,
      type: 'like',
    },
    {
      icon: <TalkIcon />,
      count: post.commentCount,
      type: 'comment',
    },
  ] as const;

  const btnHandler = (type: 'like' | 'comment') => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'like':
        if (!isLike) dispatch(addLikedPost(post.pk));
        else dispatch(removeLikedPost(post.pk));
        break;
    }
  };

  return (
    <section className={classnames('flex gap-2.5', className)}>
      {renderList.map(({ type, icon, count }) => (
        <button
          type="button"
          onClick={() => btnHandler(type)}
          key={type}
          className={classnames(
            'flex items-center justify-center gap-1 fill-gray05 text-gray05 w-14 h-8 bg-gray00 rounded-md hover:bg-gray-100 transition',
            {
              'fill-primary01 text-primary01': isLike && type === 'like',
            },
          )}
        >
          <div>{icon}</div>
          <span className="text-xs font-medium">{count}</span>
        </button>
      ))}
    </section>
  );
}
