import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import { useFetch } from '../../utils/hooks/useFetch'
import endPoints from '../../utils/api/endpoints'
import PropTypes from 'prop-types'

const Main = styled.div`
	height: 100%;
	background: #282d30;
	border-radius: 0.3125rem;
	overflow: hidden;
	box-shadow: 0px 2px 4px 0px #00000005;
	position: relative;
	color: white;
`
/**
 * Renders a radar chart of performances
 * @param  {Object} props
 * @param  {Number} props.userId - the Id of the user
 */
function ActivityTypeChart({ userId }) {
	const api = new endPoints(userId)
	const { isLoading, data, error } = useFetch(api.userPerformances())
	const kinds = data?.data.kind
	let performancesData = data ? [...data.data.data].reverse() : null

	/**
	 * translate the kind of activity from english to french
	 * @param {Object} el
	 * @returns {String}
	 */
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
ActivityTypeChart.propTypes = {
	userId: PropTypes.number.isRequired,
}
export default ActivityTypeChart
