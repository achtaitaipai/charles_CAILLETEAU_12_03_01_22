import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFetch } from '../../utils/useFetch'

const Main = styled.div`
	height: 100%;
	background: #fbfbfb;
	position: relative;
	border-radius: 0.3125rem;
	overflow: hidden;
	box-shadow: 0px 2px 4px 0px #00000005;
	h2 {
		font-size: 1rem;
		position: absolute;
		left: 1rem;
		top: 1rem;
		z-index: 1;
	}
	h3 {
		position: absolute;
		left: 50%;
		top: 50%;
		text-align: center;
		width: 5rem;
		color: #74798c;
		font-weight: 500;
		span {
			font-size: 1.5rem;
			color: black;
			font-weight: 700;
		}
		transform: translate(-50%, -50%);
	}
	svg {
		transform: scale(-1, 1);
	}
`

function ScoreChart({ userId }) {
	const radius = 35
	const { isLoading, data, error } = useFetch(`http://localhost:3000/user/${userId}`)
	const fraction = data?.data.todayScore

	const coord = f => {
		const retour = `${Math.cos(f * 2 * Math.PI - Math.PI / 2) * radius + 50} ${Math.sin(f * 2 * Math.PI - Math.PI / 2) * radius + 50}`
		return retour
	}

	if (error) {
		return (
			<Main>
				<pre className="absCenter">{error}</pre>
			</Main>
		)
	}

	return (
		<Main>
			<h2>Score</h2>

			{isLoading ? (
				<p className="absCenter">en chargement...</p>
			) : (
				fraction && (
					<>
						<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
							<path
								d={`M${coord(0)} A ${radius} ${radius} 0 ${fraction > 0.5 ? 1 : 0} 1 ${coord(fraction)}`}
								fill="transparent"
								stroke="#ff0101"
								strokeWidth="5"
								strokeLinecap="round"
							/>
						</svg>
						<h3>
							<span>{fraction * 100}% </span>
							<br></br>de votre objectif
						</h3>
					</>
				)
			)}
		</Main>
	)
}
export default ScoreChart
