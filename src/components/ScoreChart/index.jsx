import styled from 'styled-components'
import { useFetch } from '../../utils/hooks/useFetch'
import endPoints from '../../utils/api/endpoints'
import PropTypes from 'prop-types'
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts'

const Main = styled.div`
	height: 100%;
	background: #fbfbfb;
	position: relative;
	border-radius: 0.3125rem;
	overflow: hidden;
	box-shadow: 0px 2px 4px 0px #00000005;
	padding: 1rem;
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
		/* transform: scale(-1, 1); */
	}
`

/**
 * Render a piechart of the users score
 * @param {Object} props
 * @param {Number} props.userId - id of the current user
 */
function ScoreChart({ userId }) {
	const api = new endPoints(userId)
	const radius = 35
	const { isLoading, data, error } = useFetch(api.userInformations())
	const fraction = data?.data.todayScore

	/**
	 * @param {number} f - fraction of the score between 0 and 1
	 * @returns {string} -coordinates of the point
	 */
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
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									cx={'50%'}
									cy={'50%'}
									startAngle={90}
									endAngle={450}
									innerRadius={'85%'}
									outerRadius={'100%'}
									cornerRadius={'50%'}
									dataKey="value"
									data={[
										{ name: 'score', value: fraction },
										{ name: 'total', value: 1 - fraction },
									]}
								>
									<Cell fill="#E60000" stroke="#E60000" />
									<Cell fill="transparent" stroke="transparent" />
								</Pie>
								<Pie cx={'50%'} cy={'50%'} outerRadius={'85%'} fill="#FFFFFF" data={[{ name: 'ring', value: 100 }]} dataKey="value" />
							</PieChart>
						</ResponsiveContainer>
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

ScoreChart.propTypes = {
	userId: PropTypes.number.isRequired,
}
export default ScoreChart
