import React from 'react'
import { ReactComponent as Yoga } from '../../assets/imgs/yoga.svg'
import { ReactComponent as Swim } from '../../assets/imgs/swim.svg'
import { ReactComponent as Bike } from '../../assets/imgs/bike.svg'
import { ReactComponent as Workout } from '../../assets/imgs/workout.svg'
import styled from 'styled-components'

const Vertical = styled.nav`
	grid-row: 2/-1;
	grid-column: 1;
	background: #000;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	ul {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
		padding: 0 2rem;
	}
	p {
		white-space: nowrap;
		writing-mode: vertical-lr;
		transform: rotate(-180deg);
		color: white;
		font-size: 0.75rem;
		display: block;
		margin: 0 auto;
	}
`

function VerticalNavBar() {
	return (
		<Vertical>
			<ul>
				<li>
					<a href="#">
						<Yoga />
					</a>
				</li>
				<li>
					<a href="#">
						<Swim />
					</a>
				</li>
				<li>
					<a href="#">
						<Bike />
					</a>
				</li>
				<li>
					<a href="#">
						<Workout />
					</a>
				</li>
			</ul>
			<p>Copiryght, SportSee 2020</p>
		</Vertical>
	)
}

export default VerticalNavBar
