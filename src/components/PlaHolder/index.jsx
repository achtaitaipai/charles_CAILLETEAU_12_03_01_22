import styled from 'styled-components'
import PropTypes from 'prop-types'

const Main = styled.div`
	width: ${props => (props.width ? props.width : '2rem')};
	height: ${props => (props.height ? props.height : '2rem')};
	background: ${props => (props.bgColor ? props.bgColor : '#cccccc')};
	opacity: 0.8;
	margin: 0.2rem 0;
	border-radius: 0.3125rem;
`
/**
 * render a placeholder
 * @param {Object} props
 * @param {string} color - color of the placeholder
 * @param {string} width - width of the placeholder in css
 * @param {string} height - height of the placeholder in css
 */
function PlaceHolder({ color, width, height }) {
	return <Main bgColor={color} width={width} height={height}></Main>
}

PlaceHolder.propTypes = {
	color: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
}
export default PlaceHolder
