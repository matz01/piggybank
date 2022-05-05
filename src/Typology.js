import styled from "styled-components";
import { AppContext } from './App';
import { useEffect, useState, useContext } from 'react';
import { getMonth, getMonthName } from './utils/getMonth';
import { Digit } from './Digits';
import { Bar } from './Bar';

import { getSummary } from './utils/getSummary';

const StyledScroll = styled.div`
  overflow: scroll;
  height: 100vh;
`;

const StyledTypologies = styled.div`
  flex-wrap: wrap;
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
  overflow-scrolling: touch;
`;

const StyledTypologiesTitle = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 30px 0;
  text-transform: uppercase;
  color: #455a64;
`;

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

const FlexCont = styled.div`
  display: flex;
  justify-content: space-between;
  
`

const StyledGoToMonth = styled(StyledTypology)`
  background-color: cadetblue;
  color: #fff;
  margin: 30px 20px;
  
`

const StyledName = styled.div`
  margin-bottom: 10px;
  color: #546E7A;
  font-weight: bold;
`

export const Typology = () => {
  const { openAdd, budget, openSituation } = useContext(AppContext);
  const [summary, setSummary] = useState([]);

  const month = getMonth();

  useEffect(() => {
    getSummary(month, budget, setSummary);
  }, []);

  return (
    <StyledScroll>
      <StyledTypologies>
        {summary.sort((a, b) => (a.spent < b.spent) ? 1 : -1).map(item => (
          <StyledTypology key={item.name} onClick={() => openAdd(item.id)}>
            <StyledName>{item.name}</StyledName>
            <FlexCont>
              <Digit lablel={'spent'} val={item.spent} little/>
              <Digit lablel={'savings'} val={item.max - item.spent} colors labelRight/>
            </FlexCont>
            <Bar max={item.max} slim amount={item.spent}/>
          </StyledTypology>
        ))}
      </StyledTypologies>
    </StyledScroll>
  );
};
