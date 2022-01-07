import styled from 'styled-components'
import ActivityTypeChart from '../ActivityType'
import AverageSessionChart from '../AverageSessionChart'
import ScoreChart from '../ScoreChart'

const Main = styled.div`
	grid-column: 2/3;
	grid-row: 4/5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.chart {
		height: 100%;
		width: 32%;
		/* aspect-ratio: 69/69; */
	}
`

function BoxCharts({ userId }) {
	return (
		<Main>
			<div className="chart">
				<AverageSessionChart userId={12} />
			</div>
			<div className="chart">
				<ActivityTypeChart userId={12} />
			</div>
			<div className="chart">
				<ScoreChart userId={12} />
			</div>
		</Main>
	)
}
export default BoxCharts
