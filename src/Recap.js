import styled from "styled-components";
import { AppContext, SECTIONS } from './App';
import { useContext, useEffect, useState } from 'react';
import { getMonth } from './utils/getMonth';

import { getRecap } from './utils/getRecap';
import { NavBar } from './header/NavBar';
import { getSummedData } from './utils/getSummedData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { getMonthlyTransactions } from './utils/getMonthlyTransactions';
import { YearRecap } from './YearRecap';
import { MonthRecap } from './MonthRecap';
import { AllData } from './AllData';
import { StyledScroll } from './StyledScroll';


const StyledMonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 40px;
`;

const StyledButton = styled.div`
  background-color: white;
	padding: 8px 18px;
	border-radius: 30px;
	width: 200px;
	margin: 15px auto 0 auto;
	text-align: center;
`;


const StyledPrevNext = styled.div`
  background-color: white;
  border-radius: 15px;
  font-size: 11px;
  width: 40px;
  height: 40px;
  text-align: center;
  text-transform: uppercase;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;


export const Recap = () => {
	const actualMont = getMonth();
	const [month, setMonth] = useState(actualMont);
	const [allData, setAllData] = useState(undefined);
	const [changed, setChanged] = useState();
	const [details, setDetails] = useState(false)

	const [monthData, setMonthData] = useState(undefined);
	const [yearData, setYearData] = useState(undefined);

	const [monthly, setMonthly] = useState(undefined);
	const [saving, setSaving] = useState(undefined);
	const { openSection } = useContext(AppContext);


	const sumMonthData = () => {
		const _fc = getSummedData(allData, month, 'fixed_costs');
		const _b = getSummedData(allData, month, 'budget');
		const _i = getSummedData(allData, month, 'income');

		setMonthData({
			income: _i,
			costs: _fc + _b,
			total: _i - _fc - _b,
		});
	};

	const sumYearData = () => {
		const _fc = getSummedData(allData, undefined, 'fixed_costs');
		const _b = getSummedData(allData, undefined, 'budget');
		const _i = getSummedData(allData, undefined, 'income');

		setYearData({
			income: _i,
			costs: _fc +  _b,
			total: _i - _fc - _b,
		});
	};

	useEffect(() => {
		if (allData) {
			sumMonthData();
			sumYearData();
		}

	}, [allData, month]);

	useEffect(() => {
		getRecap(setAllData);
		getMonthlyTransactions(month - 1, setMonthly);
	}, []);

	useEffect(() => {
		if (!monthly || !allData) return;
		const _saving = monthly.reduce(function (acc, obj) {
			return acc + parseInt(obj.total);
		}, 0);
		const _b = getSummedData(allData, month, 'budget');
		const _ts = _b - _saving;
		setSaving(_ts);
	}, [monthly, allData]);

	const setMonthHandler = (dir, val) => {
		setChanged(dir);
		setMonth(val);
		setTimeout(() => {
			setChanged(undefined);
		}, 300);
	};




	return (
		<StyledScroll>
			<NavBar onClick={() => openSection(SECTIONS.CATEGORY)} page={'recap'}/>

				<StyledMonthSelector>
					<StyledPrevNext onClick={() => setMonthHandler("left", Math.max(month - 1, 1))}>
						<FontAwesomeIcon icon={faAngleLeft} size={'2x'}/>
					</StyledPrevNext>
					<StyledPrevNext onClick={() => setMonthHandler("right", Math.min(month + 1, 12))}>
						<FontAwesomeIcon icon={faAngleRight} size={'2x'}/>
					</StyledPrevNext>
				</StyledMonthSelector>

				<MonthRecap changed={changed} data={monthData} saving={saving} month={month}/>
				<YearRecap data={yearData} open={details}/>
				<StyledButton onClick={() => setDetails(!details)}>{details ? 'Chiudi' : 'Dettaglio'}</StyledButton>
				{ details &&
						<AllData data={allData} month={month}/>
				}
		</StyledScroll>
	);
};
