import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import './SyllabusSearch.css';

import { FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'
import useStore from '../store'
import { useQueryTasks } from '../hooks/useQueryReviews'
import { useMutateReveiw } from '../hooks/useMutateReview'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { TaskItem } from './ReviewItem'

export const Todo = () => {
  const queryClient = useQueryClient()
  const { editedReview } = useStore()
  const updateReview = useStore((state) => state.updateEditedReview)
  const { data, isLoading } = useQueryTasks()
  const { createReviewMutation, updateReviewMutation } = useMutateReview()
  const { logoutMutation } = useMutateAuth()

  // 状態として保持しているコメントを
  const submitReviewHandler = (e) => {
    e.preventDefault()
    // もしひとつも自分のレビューがない場合は新規作成してからそれを更新
    if (editedReview.id === 0)
      createReviewMutation.mutate({
        title: editedReview.title,
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
          Task Manager
        </span>
      </div>
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />
      <form onSubmit={submitReviewHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="title ?"
          type="text"
          onChange={(e) => updateReview({ ...editedReivew, Review_content: e.target.value })}
          value={editedReview.Review_content || ''}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedReivew.title}
        >
          {editedReivew.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {data?.map((review) => (
            <TaskItem key={review.id} id={reivew.id} title={review.title} />
          ))}
        </ul>
      )}
    </div>
  )
}
