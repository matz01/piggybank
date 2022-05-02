import styled from "styled-components";
import { Bar } from "./Bar";
import { Digit } from "./Digits";
import { useContext } from 'react';
import { AppContext } from './App';
import { getMonthName } from './utils/getMonth';

const StyledSummary = styled.div`
  position: relative;
  padding: 20px 20px 0 20px;
`;

const StyledDigitContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
`;

export const Summary = ({ amount, id, val }) => {
  const { budget } = useContext(AppContext);

  const d = new Date();
  const month = d.getMonth() + 1;
  const max = budget.find((o) => o.id === id)[`m${month}`];
  const monthName = getMonthName();

  const label = `${budget.find((o) => o.id === id).name} di ${monthName}`;


  return (
    <StyledSummary>
      <Bar max={max} amount={amount + val} label={label} />
      <StyledDigitContainer>
        <Digit lablel={"budget"} val={max} />
        <Digit lablel={"spesi"} val={amount + val} />
        <Digit lablel={"risparmio"} val={max - (amount + val)} colors/>
      </StyledDigitContainer>
    </StyledSummary>
  );
};
