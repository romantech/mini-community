import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'modules/store';
import {
  addLikedPost,
  removeLikedPost,
} from 'modules/community/community.slice';
import { ReactComponent as ThumbIcon } from 'assets/icons/thumb.svg';
import { ReactComponent as ThumbFilledIcon } from 'assets/icons/thumb-filled.svg';
import { ReactComponent as TalkIcon } from 'assets/icons/talk.svg';
import { selectCurrentPostWasLiked } from 'modules/community/community.selector';
import { patchPostData } from 'modules/community/community.thunk';

interface InteractiveStatProps {
  post: Post;
  loading: boolean;
  className?: string;
}

export default function InteractiveStat({
  post,
  loading,
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

  const handleLike = () => {
    const likeCount = isLike ? post.likeCount - 1 : post.likeCount + 1;
    const { id } = post;

    if (!isLike) dispatch(addLikedPost(id));
    else dispatch(removeLikedPost(id));

    dispatch(patchPostData({ id, likeCount }));
  };

  return (
    <section className={classnames('flex gap-2.5', className)}>
      {renderList.map(({ type, icon, count }) => (
        <button
          type="button"
          disabled={loading || type === 'comment'}
          onClick={() => type === 'like' && handleLike()}
          key={type}
          className={classnames(
            'flex-center gap-1 fill-gray05 text-gray05 w-14 h-8 bg-gray00 rounded-md hover:bg-gray-100 transition',
            { 'fill-primary01 text-primary01': isLike && type === 'like' },
          )}
        >
          <div>{icon}</div>
          <span className="text-xs font-medium">{count}</span>
        </button>
      ))}
    </section>
  );
}
