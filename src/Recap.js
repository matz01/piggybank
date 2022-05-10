import styled, { css, keyframes } from "styled-components";
import { AppContext, SECTIONS } from './App';
import { useContext, useEffect, useState } from 'react';
import { getMonth, getMonthName } from './utils/getMonth';

import { getRecap } from './utils/getRecap';
import { Header } from './header/Header';
import { Row } from './Row';
import { getSummedData } from './utils/getSummedData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { getMonthlyTransactions } from './utils/getMonthlyTransactions';

const MONTHS = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre"
]


const enter = keyframes`
  from {opacity: 0; left: 80px;}
  to {opacity: 1; left: 0;}
`;

const exit = keyframes`
  from {opacity: 0; left: -80px;}
  to {opacity: 1; left: 0;}
`;


const StyledScroll = styled.div`
  overflow: scroll;
  height: 100vh;
`;

const StyledPage = styled.div`
  padding: 40px 10px;
  color: #546E7A;
  
`

const StyledMonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  h2{
    text-transform: capitalize;
  }
`

const StyledYear = styled.div`
  padding: 20px 20px 1px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 8px 4px #00000007;
  margin-top: 50px;
`



const StyledMonths = styled.div`
  padding: 10px 20px 2px 20px;
  position: relative;
  transform: translate3d(0,0,0);
  animation: ${({ changed }) =>
    changed !== undefined
      ? css`
        ${changed === 'right' ? enter : exit} 0.3s linear alternate
      
      `
      : css``
  };
  
`

const StyledPrevNext = styled.div`
  background-color: white;
  border-radius: 15px;
  font-size: 11px;
  width: 30px;
  height: 30px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const Recap = () => {
  const actualMont = getMonth();
  const [month, setMonth] = useState(actualMont)
  const [allData, setAllData] = useState(undefined)
  const [income, setIncome] = useState(undefined)
  const [fixedCosts, setFixedCosts] = useState(undefined)
  const [budget, setBudget] = useState(undefined)
  const [total, setTotal] = useState(undefined)
  const [changed, setChanged] = useState(false)

  const [incomeYear, setIncomeYear] = useState(undefined)
  const [fixedCostsYear, setFixedCostsYear] = useState(undefined)
  const [budgetYear, setBudgetYear] = useState(undefined)
  const [totalYear, setTotalYear] = useState(undefined)

  const [monthly, setMonthly] = useState(undefined)
  const [saving, setSaving] = useState(undefined)
  const { openSection } = useContext(AppContext);


  const sumMonthData =() => {
    const _fc = getSummedData(allData, month, 'fixed_costs');
    const _b = getSummedData(allData, month, 'budget');
    const _i = getSummedData(allData, month, 'income');
    setIncome(_i);
    setFixedCosts(_fc);
    setBudget(_b);
    setTotal(_i - _fc - _b);
  }

  const sumYearData =() => {
    const _fc = getSummedData(allData, undefined, 'fixed_costs');
    const _b = getSummedData(allData, undefined, 'budget');
    const _i = getSummedData(allData, undefined, 'income');
    setIncomeYear(_i);
    setFixedCostsYear(_fc);
    setBudgetYear(_b);
    setTotalYear(_i - _fc - _b);
  }

  useEffect(() => {
    if(allData){
      sumMonthData();
      sumYearData()
    }

  }, [allData, month]);

  useEffect(() => {
    getRecap(setAllData);
    getMonthlyTransactions(month - 1, setMonthly)
  }, []);

  useEffect(() => {
    if(!monthly || !allData) return;
    const _saving = monthly.reduce(function (acc, obj) {
      return acc + parseInt(obj.total);
    }, 0);
    const _b = getSummedData(allData, month, 'budget');
    const _ts = _b - _saving;
      setSaving(_ts)
  }, [monthly, allData]);

  const setMonthHandler = (dir, val) => {
    setChanged(dir);
    setMonth(val)
    setTimeout(() => {setChanged(undefined)}, 300)
  }



  return (
    <StyledScroll>
      <Header onClick={() => openSection(SECTIONS.CATEGORY)} label={'Home'}/>
      <StyledPage>

        <StyledMonthSelector>
          <StyledPrevNext onClick={() => setMonthHandler("left", Math.max(month - 1, 1))} >
            <FontAwesomeIcon icon={faAngleLeft} />
          </StyledPrevNext>
          <h2>{MONTHS[month -1]}</h2>
          <StyledPrevNext onClick={() => setMonthHandler("right", Math.min(month + 1, 12))}>
            <FontAwesomeIcon icon={faAngleRight}  />
          </StyledPrevNext>
        </StyledMonthSelector>

        <StyledMonths changed={changed}>


          <Row label='Spese fisse' value={fixedCosts}/>
          <Row label='Variabili' value={budget}/>
          { (monthly > 0) &&
            <Row label='Risparmio' value={saving} colors/>
          }
          <Row label='Entrate' value={income}/>
          <Row label='Risparmio totale' value={monthly ? (total + saving) : total} total/>
        </StyledMonths>
        <StyledYear>
          <Row label='Fisse Anno' value={fixedCostsYear}/>
          <Row label='Variabili Anno' value={budgetYear}/>
          <Row label='Entrate Anno' value={incomeYear}/>
          <Row label='Risparmio Annuo' value={totalYear} total/>
        </StyledYear>
    </StyledPage>
    </StyledScroll>
  );
};
