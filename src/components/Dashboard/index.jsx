import React, { useState, useEffect } from 'react'
import CallApi from '../../utils/fetch'

import HorizontalNavBar from '../HorizontalNavBar'
import VerticalNavBar from '../VerticalNavBar'
import Header from '../Header'
import ActivityBoard from '../ActivityBoard'
import styled from 'styled-components'

const Main = styled.main`
	grid-column: 2/-1;
	grid-row: 2/-1;
	display: grid;
	grid-template-columns: calc(7vw - 2rem) 3fr 1fr calc(6vw - 2rem);
	grid-template-rows: 1.5rem 1fr 1.5fr 1.5fr 1.5rem;
	gap: 1.5rem 2rem;
	.board2 {
		grid-column: 2/3;
		grid-row: 4/5;
		background: pink;
	}
	.board3 {
		grid-column: 3/4;
		grid-row: 3/5;
		background: cyan;
	}
`

function Dashboard() {
	return (
		<>
			<HorizontalNavBar />
			<VerticalNavBar />
			<Main>
				<Header userId={12} />
				<ActivityBoard userId={12} />
				<div className="board2"></div>
				<div className="board3"></div>
			</Main>
		</>
	)
}

export default Dashboard
