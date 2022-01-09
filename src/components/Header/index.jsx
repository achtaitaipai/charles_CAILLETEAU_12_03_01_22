import styled from 'styled-components'
import PlaceHolder from '../PlaHolder'
import { useFetch } from '../../utils/hooks/useFetch'
import endPoints from '../../utils/api/endpoints'
import PropTypes from 'prop-types'

const Main = styled.header`
	grid-column: 2 / 4;
	grid-row: 2 / 3;
	display: grid;
	align-content: space-evenly;
	h1 {
		font-size: 3rem;
	}
	span {
		color: var(--accent-color);
	}
	p {
		font-weight: 400;
	}
`
/**
 * Renders the header
 * @param  {Object} props
 * @param  {Number} props.userId - the Id of the user
 */
function Header({ userId }) {
	const api = new endPoints(userId)
	const { isLoading, data, error } = useFetch(api.userInformations())
	const firstName = data?.data.userInfos.firstName

	if (error) {
		return <pre>{error}</pre>
	}

	return (
		<Main>
			{isLoading ? (
				<>
					<PlaceHolder height={'3rem'} width={'15em'} />
					<PlaceHolder width={'30em'} />
				</>
			) : (
				firstName && (
					<>
						<h1>
							Bonjour <span>{firstName}</span>
						</h1>
						<p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
					</>
				)
			)}
		</Main>
	)
}
Header.propTypes = {
	userId: PropTypes.number.isRequired,
}
export default Header
