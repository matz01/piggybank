import styled from "styled-components";
import { AppContext } from './App';
import { useContext } from 'react';
import { getMonthName } from './utils/getMonth';

const StyledTypologies = styled.div`
  flex-wrap: wrap;
  padding: 20px;
  display: flex;
  gap: 20px 10px;
  justify-content: space-around;
  align-items: stretch
`;

const StyledTypologiesTitle = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 30px 0;
  text-transform: uppercase;
  color: #455a64;
`;

const StyledTypology = styled.div`
  background-color: #D4E157;
  flex: 1;
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 7px 30px;
  height: 18px;
  border-radius: 29px;
  box-shadow: #666 0 1px 1px;
  cursor: pointer;
}
`;

const StyledGoToMonth = styled(StyledTypology)`
  background-color: cadetblue;
  color: #fff;
  margin: 30px 20px;
  
`

export const Typology = () => {
  const { openAdd, budget, openSituation } = useContext(AppContext);
  const month = getMonthName()

  return (
    <>
      <StyledTypologiesTitle>Categorie</StyledTypologiesTitle>
      <StyledTypologies>
        {budget.map((cat) => (
          <StyledTypology key={cat.name} onClick={() => openAdd(cat.id)}>
            {cat.name}
          </StyledTypology>
        ))}
      </StyledTypologies>
      <StyledGoToMonth onClick={openSituation}>Spese di {month}</StyledGoToMonth>
    </>
  );
};
