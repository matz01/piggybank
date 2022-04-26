import styled from 'styled-components';

const StyledDeleter = styled.div`
	padding: 10px 20px;
	background-color: coral;
	max-width: 200px;
	margin: 45px auto 0 auto;
	border-radius: 5px;
	font-size: 18px;
	text-align: center;
`


export const Deleter = (props) => {
	return <StyledDeleter onClick={props.onClick}>Delete all</StyledDeleter>;
};
