import styled from 'styled-components';
import { numberWithCommas } from './utils/numberWithCommas';

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 20px;
  padding: 25px 0 10px 0;
  border-top: solid 1px ${props => !props.white ? '#fff' : props.theme.text};
  margin-top: 20px;
	align-items: flex-end;
	line-height: 1;
	text-transform: uppercase;
  
`;

const StyledValue = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: -5px;
	
`;

const StyledNumber = styled.div`
	display: inline-block;
  font-size: 1.5em;
	margin: 0 4px;
  ${props => props.negative ? 'color: #f44336;' : 'color: #84CC16;'}
`;

const StyledLabel = styled.div`
  width: 40%;
`;

const StyledPlus = styled.div`
  display: inline-block;
  ${props => props.negative ? 'color: #f44336;' : 'color: #84CC16;'}
`;

export const Row = (props) => {
	const { label, value, colors, white } = props;
	const negative = value < 0;
	return (
		<StyledRow negative={negative} colors={colors} white={white}>
			<StyledLabel>{label}</StyledLabel>
			{value &&
				<StyledValue negative={negative}>
					<StyledPlus>{negative ? '' : '+'}</StyledPlus>
					<StyledNumber>{numberWithCommas(value)}</StyledNumber>
					<span>€</span>
				</StyledValue>
			}
		</StyledRow>);
};
