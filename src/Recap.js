import styled from "styled-components";
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
  margin-bottom: 20px;
  h2{
    text-transform: capitalize;
  }
`

const StyledYear = styled.div`
  padding: 10px 20px 1px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 8px 4px #00000007;
`
const StyledMonths = styled.div`
  padding: 10px 20px 2px 20px;
  
`

const StyledPrevNext = styled.div`
  background-color: white;
  border-radius: 20px;
  font-size: 11px;
  height: 25px;
  text-align: center;
  width: 30px;
  text-transform: uppercase;
  padding-top: 5px;
`

export const Recap = () => {
  const actualMont = getMonth();
  const [month, setMonth] = useState(actualMont)
  const [allData, setAllData] = useState(undefined)
  const [income, setIncome] = useState(undefined)
  const [fixedCosts, setFixedCosts] = useState(undefined)
  const [budget, setBudget] = useState(undefined)
  const [total, setTotal] = useState(undefined)

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



  return (
    <StyledScroll>
      <Header onClick={() => openSection(SECTIONS.CATEGORY)} label={'Home'}/>
      <StyledPage>
        <StyledMonths>
          <StyledMonthSelector>
            <StyledPrevNext><FontAwesomeIcon icon={faAngleLeft} onClick={() => setMonth(Math.max(month - 1, 1))} /></StyledPrevNext>
            <h2>{MONTHS[month -1]}</h2>
            <StyledPrevNext><FontAwesomeIcon icon={faAngleRight} onClick={() => setMonth(Math.min(month + 1, 12))} /></StyledPrevNext>
          </StyledMonthSelector>

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
