import styled from 'styled-components'
import AverageSessionChart from '../AverageSessionChart'

const Main = styled.div`
	grid-column: 2/3;
	grid-row: 4/5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.chart {
		height: 100%;
		width: auto;
		aspect-ratio: 69/69;

		:nth-child(2) {
			background: blue;
		}
		:nth-child(3) {
			background: red;
		}
	}
`

function BoxCharts({ userId }) {
	return (
		<Main>
			<div className="chart">
				<AverageSessionChart userId={12} />
			</div>
			<div className="chart"></div>
			<div className="chart"></div>
		</Main>
	)
}
export default BoxCharts
