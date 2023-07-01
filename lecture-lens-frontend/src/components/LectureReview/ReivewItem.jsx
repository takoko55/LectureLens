import { memo } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '../store'
import { useMutateReview } from '../hooks/useMutateReview'

// memoによってコンポーネントに変更がない場合の再レンダリングを防ぐ

const TaskReviewMemo = ({
  ReviewID,
  ReviewerID,
  ReviewerNames,
  LectureID,
  Review_Content,
  Review_Star
}) => {
  const updateReview = useStore((state) => state.updateEditedReview)
  const { deleteReviewMutation } = useMutateReview()
  return (
    <li className="my-3">
      <span className="font-bold">{title}</span>
      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            updateReview({
                ReviewID: ReviewID,
                ReviewerID: ReviewerID,
                ReviewerNames: ReviewerNames,
                LectureID: LectureID,
                Review_Content: Review_Content,
                Review_Star: Review_Star
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteReviewMutation.mutate(ReviewID)
          }}
        />
      </div>
    </li>
  )
}
export const TaskItem = memo(TaskReviewMemo)
