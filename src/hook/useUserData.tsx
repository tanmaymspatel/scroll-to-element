import { useState, useEffect } from 'react'
import scrollServices from '../shared/services/scrollServices'

function useUserData(pageNum = 1) {
    const [users, setUsers] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)
    const { getUsers } = scrollServices;

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getUsers(pageNum, { signal })
            .then(data => {
                setUsers((prev: any) => [...prev, ...data])
                setHasNextPage(Boolean(data.length))
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [pageNum])

    return { isLoading, isError, error, users, hasNextPage }
}

export default useUserData;