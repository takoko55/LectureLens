import { FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'
import useStore from '../store'
import { useQueryReviews } from '../hooks/useQueryReviews'
import { useMutateReview } from '../hooks/useMutateReview'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const ReviewPost = () => {
  const queryClient = useQueryClient()
  const { editedReview } = useStore()
  const updateReview = useStore((state) => state.updateEditedReview)
  const { data, isLoading } = useQueryReviews()
  const { createReviewMutation, updateReviewMutation } = useMutateReview()
  const { logoutMutation } = useMutateAuth()
  const submitReviewHandler = (e) => {
    e.preventDefault()
    if (editedReview.id === 0)
      createReviewMutation.mutate({
        review_content: editedReview.review_content,
        review_star: editedReview.star,
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
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">
          Review Manager
        </span>
      </div>
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />

      {/* // formの中身
      // 記述すべきこと
      // 1. レビューの中身
      // 2. 星の数
      // 3. 送信ボタン */}
      <form onSubmit={submitReviewHandler}>

        {/*   ---レビューの入力 --- */}
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="Review"
          type="text"
          onChange={(e) => updateReview({ ...editedReview, review_content: e.target.value })}
          value={editedReview.review_content || ''}
        />

        {/*  --- 星の入力 --- */}
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="Review"
          type="text"
          onChange={(e) => updateReview({ ...editedReview, review_star: e.target.value })}
          value={editedReview.star || 0}
        />

        {/* 送信ボタン */}
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedReview.review_content}
        >
          {editedReview.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {data?.map((review) => (
            <TaskItem key={review.id} id={review.id} content={review.review_content} />
          ))}
        </ul>
      )}
    </div>
  )
}
