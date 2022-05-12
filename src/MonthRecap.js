import styled, { css, keyframes } from 'styled-components';
import { FlexCont } from './FlexCont';
import { Digit } from './Digits';
import { Row } from './Row';
import { MONTHS } from './utils/constants';

const enter = keyframes`
  from {
    opacity: 0;
    left: 150px;
  }
  to {
    opacity: 1;
    left: 0;
  }
`;
const exit = keyframes`
  from {
    opacity: 0;
    left: -150px;
  }
  to {
    opacity: 1;
    left: 0;
  }
`;
const StyledMonths = styled.div`
  color: #fff;
  padding: 10px 20px 2px 20px;
  position: relative;
  transform: translate3d(0, 0, 0);
	h2{
		font-size: 24px;
		margin: 10px 0 20px 0;
	}
  animation: ${({ changed }) =>
		changed !== undefined
			? css`
				${changed === 'right' ? enter : exit} 0.2s linear alternate

			`
			: css``
  };

`;
export const MonthRecap = ({ data, changed, saving, month }) => {
	if (!data) return null;
	const { income, fixedCosts, budget, total } = data;
	return (
		<StyledMonths changed={changed}>
			<h2>{MONTHS[month - 1]}</h2>
			<FlexCont>
				<Digit val={fixedCosts} lablel="Fisse" white/>
				<Digit val={budget} lablel="Variabili" white/>
				<Digit val={income} lablel="Entrate" white/>
			</FlexCont>

			<Row label="Totale Mese" value={saving ? (total + saving) : total} />
		</StyledMonths>
		);
};
