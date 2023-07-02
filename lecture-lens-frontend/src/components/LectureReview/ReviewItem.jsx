import { memo } from 'react'
import useStore from '../store'
import { useMutateReview } from '../hooks/useMutateReview'

// memoによってコンポーネントに変更がない場合の再レンダリングを防ぐ

const ReviewMemo = ({
  ReviewerName,
  Review_Content,
  Review_Star
}) => {
  return (
    <li className="my-3">
      <span className="font-bold">{ReviewerName}{Review_Star}</span>
      <div className="flex float-right ml-20">
        {Review_Content}
      </div>
    </li>
  )
}
export const ReviewItem = memo(ReviewMemo)
