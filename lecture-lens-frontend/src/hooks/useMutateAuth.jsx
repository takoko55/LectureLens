import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useStore from '../store'
import { useError } from '../hooks/useError'

export const useMutateAuth = () => {
    const navigate = useNavigate()
    const resetEditedTask = useStore((state) => state.resetEditedTask)
    const { switchErrorHandling } = useError()
    
    const loginMutation = useMutation(
        async (user) => 
            await axios.post(`${process.env.REACT_APP_API_URL}/login`, user),
            {
                onSuccess: () => {
                    navigate("/LoginTopPage")
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

    const registerMutation = useMutation(
        async (user) => 
        await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
        {
            onError: (err) => {
                if (err.response.data.message) {
                    switchErrorHandling(err.response.data.message)
                } else {
                    switchErrorHandling(err.response.data)
                }
            },
        }
    )

    const logoutMutation = useMutation(
        async () => await axios.post(`${process.env.REACT_APP_API_URL}/logout`),
        {
            onSuccess: () => {
                // これわからん
                // resetEditedTask()
                // ログアウトした場合はTopPageに遷移
                navigate("/TopPage")
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

    return { loginMutation, registerMutation, logoutMutation }
}