import styled from "styled-components";
import { AppContext, SECTIONS } from './App';
import { useContext, useEffect, useState } from 'react';
import { getMonth } from './utils/getMonth';

import { getSummary } from './utils/getSummary';
import { NavBar } from './header/NavBar';
import { Category } from './Category';
import { StyledPage } from './StyledPage';

const StyledScroll = styled.div`
  overflow: scroll;
  height: 100vh;
`;

const StyledTypologies = styled.div`
  margin-bottom: 70px;
  flex-wrap: wrap;
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
  overflow-scrolling: touch;
`;


export const Categories = () => {
  const { openAdd, budget, openSection } = useContext(AppContext);
  const [summary, setSummary] = useState([]);

  const month = getMonth();

  useEffect(() => {
    getSummary(month, budget, setSummary);
  }, []);

  return (
    <StyledPage>
    <StyledScroll>
      <NavBar page={SECTIONS.CATEGORY}/>
      <StyledTypologies>
        {summary.sort((a, b) => (a.spent < b.spent) ? 1 : -1).map(item => (
          <Category key={item.name} onClick={() => openAdd(item.id)} item={item}/>
        ))}
      </StyledTypologies>
    </StyledScroll>
    </StyledPage>
  );
};
