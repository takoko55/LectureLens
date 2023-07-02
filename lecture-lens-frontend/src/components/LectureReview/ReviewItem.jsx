import { memo } from 'react'
import './ReviewItem.css';
//import useStore from '../store'
//import { useMutateReview } from '../hooks/useMutateReview'

// memoによってコンポーネントに変更がない場合の再レンダリングを防ぐ

const ReviewMemo = ({
  ReviewerName,
  Review_Content,
  Review_Star
}) => {
  return (
    <>
      <div class="comment-contents">
        <div class="comment-left">
          <p>{ReviewerName}</p>
          <div class="review-star">
            <p>{Review_Star}</p>
          </div>
          
        </div>

        <div class="comment-right">
          <p>{Review_Content}</p>
        </div>
      </div>
      
    
    </>


    
  )
}
export const ReviewItem = memo(ReviewMemo)
