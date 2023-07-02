import { memo } from 'react'
import './ReviewItem.css';
import{BsFillChatHeartFill} from "react-icons/bs";
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
          <p class="reviewer-name">{ReviewerName}</p>
          <div class="review-star">
            <p>{"★".repeat(Review_Star)}</p>
          </div>
          
        </div>

        <div class="comment-right">
          <p class="review-content">{Review_Content}</p>
          <p class="iine"><BsFillChatHeartFill /></p>
        </div>
      </div>
      
    
    </>


    
  )
}
export const ReviewItem = memo(ReviewMemo)
