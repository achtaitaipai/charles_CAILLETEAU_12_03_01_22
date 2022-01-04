import React, { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import styled from 'styled-components'
import CallApi from '../../utils/fetch'

const Main = styled.div`
	height: 100%;
	h2 {
		position: absolute;
		z-index: 1;
		width: 150px;
		margin: 0.6rem 1rem;
		font-size: 1rem;
		color: white;
		opacity: 0.5;
		font-weight: 500;
	}
	.custom-tooltip {
		background: white;
		color: black;
		padding: 0.4rem 0.6rem;
	}
	.recharts-cartesian-axis {
		font-family: 'Roboto', sans-serif;
		font-weight: bolder;
	}
`

function AverageSessionChart({ userId }) {
	const [data, setData] = useState([])
	const [mousePercent, setMousePercent] = useState(0)
	const dayName = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

	useEffect(() => {
		const api = new CallApi(userId)
		api.average().then(result => {
			const newData = result.data.sessions.map((el, index) => {
				el.day = dayName[index]
				return el
			})
			setData(newData)
			console.log(data)
		})
	}, [])

	function CustomTooltip({ payload, active }) {
		if (active) {
			return (
				<div className="custom-tooltip">
					<p>{`${payload[0].value}min`}</p>
				</div>
			)
		}

		return null
	}

	const onMouseMove = hoveredData => {
		if (hoveredData && hoveredData.activePayload) {
			console.log(hoveredData)
			setMousePercent((100 * hoveredData.activeTooltipIndex) / 6)
		} else {
			setMousePercent(0)
		}
	}
	const onMouseOut = hoveredData => {
		setMousePercent(0)
	}

	return (
		<Main>
			<h2>Durée moyenne des sessions</h2>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					lab="Durée moyenne des sessions"
					data={data}
					onMouseMove={onMouseMove}
					onMouseOut={onMouseOut}
					style={{
						background: `linear-gradient(-90deg, rgba(230,0,0,1) 0%, rgba(230,0,0,1) ${100 - mousePercent}%, rgba(255,0,0,1) ${
							100 - mousePercent
						}%, rgba(230,0,0,1) 100%)`,
					}}
				>
					<label htmlFor=""></label>
					<defs>
						<linearGradient id="linear" x1="0%" y1="0" x2="100%" y2="0">
							<stop offset="0%" stopColor="blue" />
							<stop offset={`${0}%`} stopColor="#ffffff28" />
							<stop offset={`${mousePercent}%`} stopColor="#ffffff" />
							<stop offset={`${100}%`} stopColor="#ffffff" />
						</linearGradient>
					</defs>
					<XAxis dataKey="day" tick={{ fill: '#ffffffa6', fontSize: 12 }} tickLine={false} tickMargin={8} strokeWidth={0} />
					<Tooltip content={<CustomTooltip />} cursor={false} />
					<Line
						type="monotone"
						dataKey="sessionLength"
						stroke="url(#linear)"
						dot={false}
						strokeWidth={2}
						activeDot={{ fill: 'white', strokeWidth: 10, r: 5, strokeOpacity: 0.3 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Main>
	)
}
export default AverageSessionChart
