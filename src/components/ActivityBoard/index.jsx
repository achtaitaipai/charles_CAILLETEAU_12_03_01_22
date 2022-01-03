import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import CallApi from '../../utils/fetch'

const Main = styled.div`
	grid-column: 2/3;
	grid-row: 3/4;
	background: var(--neutral-color);
`
function ActivityBoard({ userId }) {
	const [data, setData] = useState([{ kilogram: 0, calories: 0, day: 0 }])

	useEffect(() => {
		const api = new CallApi(userId)
		api.activity().then(result => setData(result.data.sessions))
		console.log(data)
	}, [])

	return (
		<Main>
			{/* {data.map((el,index)=>{
                return <li key={index}>{el.day} : {el.kilogram},{el.calories}</li>
            })} */}
			<h2 className="chart-title">Activité quotidienne</h2>
			<ul className="chart-legend">
				<li>Poids (kg)</li>
				<li>Calories brûlées (kCal)</li>
			</ul>
		</Main>
	)
}
export default ActivityBoard
