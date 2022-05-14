import styled from 'styled-components';

export const StyledHeader = styled.div`
  position: fixed;
	display: flex;
  background-color: #fff;
  color: #546E7A;
  font-weight: bold;

  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
	margin: auto;
	text-align: center;
  box-shadow: 2px -8px 4px #00000007;
`;

export const StyledHeaderItem = styled.div`
  width: 50%;
	height: 100%;
  padding: 12px 0;
	&:first-child{
		border-right: solid 1px #ccc;
	}
	${props => props.selected && 'border-bottom: solid 4px #7cb342'}
	
`;



export const NavBar = ({ onClick, page }) => (
	<StyledHeader>
		<StyledHeaderItem
			onClick={() => page === 'add' ? {} : onClick()}
			selected={page === 'add'}
		>
			Add
		</StyledHeaderItem>
		<StyledHeaderItem
			onClick={() => page === 'recap' ? {} : onClick()}
			selected={page === 'recap'}
		>
			Recap
		</StyledHeaderItem>
	</StyledHeader>
)
