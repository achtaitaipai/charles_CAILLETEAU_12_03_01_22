import { useEffect, useState } from 'react'

/**
 *
 * @param {String} url
 * @returns {Object}
 */
export function useFetch(url) {
	const [data, setData] = useState()
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState()

	useEffect(() => {
		if (!url) return
		fetch(url)
			.then(response => response.json())
			.then(jsonResponse => setData(jsonResponse))
			.then(() => setLoading(false))
			.catch(err => {
				if (err) {
					setError(err.toString())
				}
			})
	}, [url])
	return { isLoading, data, error }
}

export default useEffect
