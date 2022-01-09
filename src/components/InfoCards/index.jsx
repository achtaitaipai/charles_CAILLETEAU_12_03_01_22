import styled from 'styled-components'
import { ReactComponent as Fire } from '../../assets/imgs/fire.svg'
import { ReactComponent as Chicken } from '../../assets/imgs/chicken.svg'
import { ReactComponent as Apple } from '../../assets/imgs/apple.svg'
import { ReactComponent as CheeseBurger } from '../../assets/imgs/cheeseburger.svg'
import { useFetch } from '../../utils/hooks/useFetch'
import endPoints from '../../utils/api/endpoints'
import PropTypes from 'prop-types'

const Main = styled.main`
	grid-column: 3/4;
	grid-row: 3/5;
	position: relative;
	ul {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		li {
			background: #fbfbfb;
			border-radius: 0.3125rem;
			padding: 2rem;
			display: flex;
			justify-content: space-around;
			.infos {
				display: flex;
				flex-direction: column;
				span {
					color: #74798c;
				}
			}
		}
		.icon {
			width: 3rem;
			height: auto;
			aspect-ratio: 69/69;
			background: #000;
			display: grid;
			place-items: center;
			border-radius: 0.31225rem;
		}
		.fire {
			background: #fbeaea;
		}
		.chicken {
			background: #e9f4fb;
		}
		.apple {
			background: #fbf6e5;
		}
		.cheeseburger {
			background: #fbeaef;
		}
	}
`
/**
 * Render a list of infocards
 * @param  {Object} props
 * @param  {Number} props.userId - the Id of the user
 */
function InfoCards({ userId }) {
	const api = new endPoints(userId)
	const { isLoading, data, error } = useFetch(api.userInformations())
	const keyData = data?.data.keyData

	const formatNumber = n => (String(n).length > 3 ? String(n).slice(0, 1) + ',' + String(n).slice(1) : n)

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
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			) : (
				keyData && (
					<ul>
						<li>
							<div className="icon fire">
								<Fire />
							</div>
							<div className="infos">
								<strong>{formatNumber(keyData.calorieCount)}Kcal</strong>
								<span>Calories</span>
							</div>
						</li>
						<li>
							<div className="icon chicken">
								<Chicken />
							</div>
							<div className="infos">
								<strong>{formatNumber(keyData.proteinCount)}g</strong>
								<span>Protéines</span>
							</div>
						</li>
						<li>
							<div className="icon apple">
								<Apple />
							</div>
							<div className="infos">
								<strong>{formatNumber(keyData.carbohydrateCount)}g</strong>
								<span>Glucides</span>
							</div>
						</li>
						<li>
							<div className="icon cheeseburger">
								<CheeseBurger />
							</div>
							<div className="infos">
								<strong>{formatNumber(keyData.lipidCount)}g</strong>
								<span>Lipides</span>
							</div>
						</li>
					</ul>
				)
			)}
		</Main>
	)
}
InfoCards.propTypes = {
	userId: PropTypes.number.isRequired,
}
export default InfoCards
