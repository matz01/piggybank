import styled from 'styled-components';
import { Row } from './Row';
import { Digit } from './Digits';
import { FlexCont } from './FlexCont';

const StyledYear = styled.div`
  padding: 20px 20px 1px 20px;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 2px 8px 4px #00000007;
  margin-top: 50px;
  color: ${props => props.theme.text};
	position: fixed;
	bottom: 0;
	left: 0; 
	right: 0;
`;
export const YearRecap = ({ data }) => {
	if (!data) return null;
	const { income, fixedCosts, budget, total } = data;
	return <StyledYear>
		<FlexCont>
			<Digit val={fixedCosts} lablel="Fisse" little/>
			<Digit val={budget} lablel="Variabili" little />
			<Digit val={income} lablel="Entrate" little/>
		</FlexCont>
		<Row label="Totale Anno" value={total} white/>
	</StyledYear>;
};
