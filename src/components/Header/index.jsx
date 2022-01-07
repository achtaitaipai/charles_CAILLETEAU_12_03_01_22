import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFetch } from '../../utils/useFetch'
import PlaceHolder from '../PlaHolder'

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
	const { isLoading, data, error } = useFetch(`http://localhost:3000/user/${userId}`)
	const firstName = data?.data.userInfos.firstName

	if (error) {
		return <pre>{error}</pre>
	}

	return (
		<Main>
			{isLoading ? (
				<>
					<PlaceHolder height={'3rem'} width={'15em'} />
					<PlaceHolder width={'30em'} />
				</>
			) : (
				firstName && (
					<>
						<h1>
							Bonjour <span>{firstName}</span>
						</h1>
						<p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
					</>
				)
			)}
		</Main>
	)
}
export default Header
