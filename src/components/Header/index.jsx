import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CallApi from '../../utils/fetch'

const Main = styled.header`
	grid-column: 2 / 4;
	grid-row: 2 / 3;
	display: grid;
	align-content: space-evenly;
	h1 {
		font-size: 3rem;
	}
	span {
		color: var(--accent-color);
	}
	p {
		font-weight: 400;
	}
`
function Header({ userId }) {
	const [data, setData] = useState('')

	useEffect(() => {
		const api = new CallApi(userId)
		api.identity().then(result => setData(result.data.userInfos))
	}, [])

	return (
		<Main>
			<h1>
				Bonjour <span>{data.firstName}</span>
			</h1>
			<p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
		</Main>
	)
}
export default Header
