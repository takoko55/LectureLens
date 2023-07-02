import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import { Task } from '../types'
import { useError } from '../hooks/useError'

export const useQueryReviews = () => {
  const { switchErrorHandling } = useError()
  const getReviews = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/reviews`,
      { withCredentials: true }
    )
    return data
  }
  return useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
    staleTime: Infinity,
    onError: (err) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}
