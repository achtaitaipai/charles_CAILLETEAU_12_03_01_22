import React, { useEffect, useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import { useFetch } from '../../utils/useFetch'

const Main = styled.div`
	height: 100%;
	background: #282d30;
	border-radius: 0.3125rem;
	overflow: hidden;
	box-shadow: 0px 2px 4px 0px #00000005;
	position: relative;
	color: white;
`

function ActivityTypeChart({ userId }) {
	const { isLoading, data, error } = useFetch(`http://localhost:3000/user/${userId}/performance`)
	const newOrder = [6, 5, 4, 3, 2, 1]
	const kinds = data?.data.kind
	let performancesData = data ? [...data.data.data].reverse() : null

	const tradKind = el => {
		const trads = { intensity: 'Intensité', speed: 'Vitesse', cardio: 'Cardio', energy: 'Energie', endurance: 'Endurance', strength: 'Force' }
		return trads[kinds[el.kind]]
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
			{isLoading ? (
				<p className="absCenter">en chargement...</p>
			) : (
				performancesData && (
					<ResponsiveContainer width="100%" height="100%">
						<RadarChart cx="50%" cy="50%" outerRadius="60%" data={performancesData}>
							<PolarGrid radialLines={false} />
							<PolarAngleAxis dataKey={tradKind} tick={{ fill: '#ffffffa6', fontSize: 12, margin: '10' }} />
							<Radar axisLine={false} dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
						</RadarChart>
					</ResponsiveContainer>
				)
			)}
		</Main>
	)
}
export default ActivityTypeChart
