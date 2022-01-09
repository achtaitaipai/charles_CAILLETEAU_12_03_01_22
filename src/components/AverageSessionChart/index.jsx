import React, { useState } from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import styled from 'styled-components'
import { useFetch } from '../../utils/hooks/useFetch'
import endPoints from '../../utils/api/endpoints'
import PropTypes from 'prop-types'

const Main = styled.div`
	height: 100%;
	border-radius: 0.3125rem;
	overflow: hidden;
	box-shadow: 0px 2px 4px 0px #00000005;
	background: var(--accent-color);
	position: relative;
	color: white;
	h2 {
		position: absolute;
		z-index: 1;
		width: 150px;
		margin: 0.6rem 1rem;
		font-size: 1rem;
		color: white;
		opacity: 0.5;
		font-weight: 500;
		pointer-events: none;
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
/**
 * Renders a linechart of average sessions
 * @param  {Object} props
 * @param  {Number} props.userId - the Id of the user
 */
function AverageSessionChart({ userId }) {
	const api = new endPoints(userId)
	const { isLoading, data, error } = useFetch(api.userAverageSessions())
	const dayName = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
	const averageSessionsDatas = data?.data.sessions.map((el, index) => {
		el.day = dayName[index]
		return el
	})
	const [mousePercent, setMousePercent] = useState(0)

	/**
	 *
	 * @param {Object} param
	 * @param {Boolean} param.active
	 * @param {Array} param.playload
	 * @returns {JSX|null}
	 */
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

	/**
	 * set the MousePercent
	 * @param {Object} hoveredData
	 */
	const onMouseMove = hoveredData => {
		if (hoveredData && hoveredData.activePayload) {
			setMousePercent((100 * hoveredData.activeTooltipIndex) / 6)
		} else {
			setMousePercent(0)
		}
	}
	/**
	 * set mousePercent to zero when the mouse leave the zone
	 */
	const onMouseOut = () => {
		setMousePercent(0)
	}

	const bg = {
		background: `linear-gradient(-90deg, rgba(230,0,0,1) 0%, rgba(230,0,0,1) ${100 - mousePercent}%, rgba(255,0,0,1) ${
			100 - mousePercent
		}%, rgba(230,0,0,1) 100%)`,
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
			<h2>Durée moyenne des sessions</h2>
			{isLoading ? (
				<p className="absCenter">en chargement...</p>
			) : (
				averageSessionsDatas && (
					<ResponsiveContainer width="100%" height="100%">
						<LineChart lab="Durée moyenne des sessions" data={averageSessionsDatas} onMouseMove={onMouseMove} onMouseOut={onMouseOut} style={bg}>
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
				)
			)}
		</Main>
	)
}

AverageSessionChart.propTypes = {
	userId: PropTypes.number.isRequired,
}
export default AverageSessionChart
