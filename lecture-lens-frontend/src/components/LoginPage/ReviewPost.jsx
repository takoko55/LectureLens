import { useQueryClient } from '@tanstack/react-query'
import useStore from '../../store'
// import { useQueryReviews } from '../../hooks/useQueryReviews'
import { useMutateReview } from '../../hooks/useMutateReview'
import { useMutateAuth } from '../../hooks/useMutateAuth'
import './ReviewPost.css';

export const ReviewPost = ({ LectureID }) => {
  const queryClient = useQueryClient()
  const { editedReview } = useStore()
  const updateReview = useStore((state) => state.updateEditedReview)
  // console.log()
  // const { data, isLoading } = useQueryReviews()
  useStore((state) => state.test)
  const { createReviewMutation, updateReviewMutation } = useMutateReview()
  const { logoutMutation } = useMutateAuth()
  const submitReviewHandler = (e) => {
    e.preventDefault()
    if (editedReview.id === 0)
      createReviewMutation.mutate({
        review_content: editedReview.review_content,
        review_star: editedReview.review_star,
        lecture_id: LectureID
      })
    else {
      updateReviewMutation.mutate(editedReview)
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['reviews'])
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <div class="header">
        <span className="text-center text-3xl font-extrabold" class ="header-title">
            Lecture Lens
          </span>
        </div>
        
        
      </div>
      
    <div class="post-form">
      {/* // formの中身
      // 記述すべきこと
      // 1. レビューの中身
      // 2. 星の数
      // 3. 送信ボタン */}
      <form onSubmit={submitReviewHandler}>

        {/*   ---レビューの入力 --- */}
        <input
          id = "review_content"
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          class = "post_review_content"
          placeholder="レビューを入力してください"
          type="text"
          onChange={(e) => updateReview({ ...editedReview, review_content: e.target.value })}
          value={editedReview.review_content || ''}
        />

        {/*  --- 星の入力 --- */}
        <input
          id = "review_star"
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="Review"
          class = "post_review_star"
          type="text"
          onChange={(e) => updateReview({ ...editedReview, review_star: e.target.value })}
          value={editedReview.review_star || 0}
        />

        {/* 送信ボタン */}
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedReview.review_content}
        >
          {editedReview.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      </div>
      
    </div>
  )
}
