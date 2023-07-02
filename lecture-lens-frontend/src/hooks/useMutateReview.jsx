import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import useStore from '../store'
import { useError } from './useError'

export const useMutateReview = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedReview = useStore((state) => state.resetEditedReview)

  
  const createReviewMutation = useMutation(
    (review) =>
      axios.post(`${process.env.REACT_APP_API_URL}/review/PostReview`, review),
    {
      onSuccess: (res) => {
        const previousReviews = queryClient.getQueryData(['PostReview'])
        if (previousReviews) {
          queryClient.setQueryData(['PostReview'], [...previousReviews, res.data])
        }
        resetEditedReview()
      },
      onError: (err) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const updateReviewMutation = useMutation(
    (review) =>
      axios.put(`${process.env.REACT_APP_API_URL}/reviews/${review.id}`, {
        title: review.title,
      }),
    {
      onSuccess: (res, variables) => {
        const previousReviews = queryClient.getQueryData(['reviews'])
        if (previousReviews) {
          queryClient.setQueryData(
            ['reviews'],
            previousReviews.map((review) =>
              review.id === variables.id ? res.data : review
            )
          )
        }
        resetEditedReview()
      },
      onError: (err) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  // レビューを削除するときのmutation
  const deleteReviewMutation = useMutation(
    (id) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousReviews = queryClient.getQueryData(['reviews'])
        if (previousReviews) {
          queryClient.setQueryData(
            ['reviews'],
            previousReviews.filter((review) => review.id !== variables)
          )
        }
        resetEditedReview()
      },
      onError: (err) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  return {
    createReviewMutation,
    updateReviewMutation,
    deleteReviewMutation,
  }
}
