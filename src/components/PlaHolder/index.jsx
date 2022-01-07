import styled from 'styled-components'

const Main = styled.div`
	width: ${props => (props.width ? props.width : '2rem')};
	height: ${props => (props.height ? props.height : '2rem')};
	background: ${props => (props.bgColor ? props.bgColor : '#cccccc')};
	opacity: 0.8;
	margin: 0.2rem 0;
	border-radius: 0.3125rem;
`

function PlaceHolder({ color, width, height }) {
	return <Main bgColor={color} width={width} height={height}></Main>
}

export default PlaceHolder
