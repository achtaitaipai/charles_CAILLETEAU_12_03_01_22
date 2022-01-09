import React from 'react'
import { ReactComponent as Logo } from '../../assets/imgs/logo.svg'
import styled from 'styled-components'

const Horizontal = styled.nav`
	grid-column: 1/-1;
	grid-row: 1;
	background: #000;
	ul {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		gap: 10%;
		padding: 0 2rem;
	}
	a {
		color: white;
		font-size: 1.5rem;
		font-weight: 500;
		transition: color 0.3s ease-in-out;
		display: flex;
		align-items: center;
	}
	a:hover {
		color: var(--accent-color);
	}
`
/**
 * Render the horizontal navbar
 */
function HorizontalNavBar() {
	return (
		<Horizontal>
			<ul>
				<li>
					<a href="#">
						<Logo />
					</a>
				</li>
				<li>
					<a href="#">Accueil</a>
				</li>
				<li>
					<a href="#">Profil</a>
				</li>
				<li>
					<a href="#">Réglage</a>
				</li>
				<li>
					<a href="#">Communauté</a>
				</li>
			</ul>
		</Horizontal>
	)
}

export default HorizontalNavBar
