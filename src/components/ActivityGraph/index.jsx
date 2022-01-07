import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import { useFetch } from '../../utils/useFetch'

const Main = styled.div`
	grid-column: 2/3;
	grid-row: 3/4;
	background: var(--neutral-color);
	box-shadow: 0px 2px 4px 0px #00000005;
	border-radius: 0%.3125rem;
	position: relative;
	.legend {
		display: flex;
		padding: 1.5rem 1.5rem 0 2rem;
		margin-bottom: 1rem;
		h2 {
			font-size: 1rem;
		}
		ul {
			margin-left: auto;
			display: flex;
			align-items: center;
			gap: 3.5rem;
		}
		li {
			color: #74798c;
			font-size: 0.9rem;
			position: relative;
		}
		li:before {
			content: '';
			position: absolute;
			left: -1rem;
			top: 0.15rem;
			background: #e60000;
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
		}
		li:first-child:before {
			background: #000;
		}
	}
	.custom-tooltip {
		background: var(--accent-color);
		color: white;
		padding: 0 0.8rem;
		height: 4rem;
		font-size: 0.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		gap: 0.5rem;
	}
`

function ActivityBoard({ userId }) {
	const { isLoading, data, error } = useFetch(`http://localhost:3000/user/${userId}/activity`)
	const activityData = data?.data.sessions.map((el, index) => {
		el.day = index + 1
		return el
	})

	const CustomTooltip = ({ payload, label, active }) => {
		if (active) {
			return (
				<div className="custom-tooltip">
					<p className="kg">{`${payload[0].value}kg`}</p>
					<p className="cal">{`${payload[1].value} Kcal`}</p>
				</div>
			)
		}

		return null
	}
	const renderLegend = () => {
		return (
			<div className="legend">
				<h2 className="chart-title">Activité quotidienne</h2>
				<ul className="chart-legend">
					<li>Poids (kg)</li>
					<li>Calories brûlées (kCal)</li>
				</ul>
			</div>
		)
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
				activityData && (
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={activityData} barGap={8}>
							<Legend verticalAlign="top" content={renderLegend} />
							<CartesianGrid strokeDasharray="2" vertical={false} />
							<XAxis dataKey="day" tickMargin={8} tickSize={0} />
							<YAxis yAxisId="right" orientation="right" tickMargin={10} tickSize={0} axisLine={false} tickCount={3} />
							<YAxis yAxisId="hidden" hide />
							<Tooltip content={<CustomTooltip />} />
							<Bar yAxisId="right" dataKey="kilogram" fill="#282D30" barSize={7} radius={[5, 5, 0, 0]} />
							<Bar yAxisId="hidden" dataKey="calories" fill="#E60000" barSize={7} radius={[5, 5, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				)
			)}
		</Main>
	)
}
export default ActivityBoard
