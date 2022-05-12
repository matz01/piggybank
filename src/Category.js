import { Digit } from './Digits';
import { Bar } from './Bar';
import styled from 'styled-components';
import { FlexCont } from './FlexCont';

const StyledTypology = styled.div`
  background-color: #fefefe;
  flex-basis: 48%;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: left;
  text-transform: capitalize;
  font-weight: 400;
  white-space: nowrap;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  height: 112px;
}
`;
const StyledName = styled.div`
  margin-bottom: 10px;
  color: ${props => props.theme.text};
  font-weight: normal;
`;
export const Category = (props) => {
	return <StyledTypology onClick={props.onClick}>
		<StyledName>{props.item.name}</StyledName>
		<FlexCont>
			<Digit lablel={'spent'} val={props.item.spent} little/>
			<Digit lablel={'savings'} val={props.item.max - props.item.spent} colors labelRight little/>
		</FlexCont>
		<Bar max={props.item.max} slim amount={props.item.spent}/>
	</StyledTypology>;
};
