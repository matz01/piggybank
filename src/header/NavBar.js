import styled from 'styled-components';
import { AppContext, SECTIONS } from '../App';
import { useContext } from 'react';

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
  flex: 1;
	height: 100%;
  padding: 12px 0;
	text-transform: uppercase;
  border-right: solid 1px #ccc;
	&:last-child{
		border-right: none
	}
	${props => props.selected && 'border-bottom: solid 4px #7cb342'}
	
`;


const HeaderItem = ({ id, page, cb}) => {
	const onClick = () => {
		console.log(id)
		cb(id)
	}
	return <StyledHeaderItem
		onClick={() => page === id ? {} : onClick()}
		selected={page === id}
	>
		{id}
	</StyledHeaderItem>;
};


export const NavBar = ({ page }) => {
	const { openSection } = useContext(AppContext);
	return (
		<StyledHeader>
			<HeaderItem cb={openSection} page={page} id={SECTIONS.CATEGORY}/>
			<HeaderItem cb={openSection} page={page} id={SECTIONS.RECAP}/>
			<HeaderItem cb={openSection} page={page} id={SECTIONS.STATS}/>
		</StyledHeader>
	)
}
