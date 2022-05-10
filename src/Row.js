import styled from 'styled-components';
import { numberWithCommas } from './utils/numberWithCommas';

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
	margin-bottom: 15px;
  ${props => props.colors && (props.negative ? 'color: #f44336;' : 'color: #7cb342;')}
  ${props => props.total && 'font-size: 22px; padding-top: 15px; border-top: solid 1px #ccc;'}
`;

const StyledValue = styled.div`
	font-weight: bold;
	font-size: 1.2em;
	span{
    font-size: .7em;
		font-weight: normal;
	}
`

export const Row = ({ label, value, total, colors }) => {
	const negative = value < 0
	return(<StyledRow negative={negative} colors={colors} total={total}>
		<div>{label}</div>
		{value &&
			<StyledValue negative={negative}>{numberWithCommas(value)}<span>€</span></StyledValue>
		}
	</StyledRow>)
}
