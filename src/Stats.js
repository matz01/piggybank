import React, { useEffect, useState } from 'react';
import { StyledScroll } from './StyledScroll';
import { getRecap, getTagRecap } from './utils/getRecap';
import { NavBar } from './header/NavBar';
import { SECTIONS } from './App';
import { fullDataWithTotal } from './utils/getSummedData';
import { AllDataSection } from './AllDataSection';
import { StyledSection } from './StyledSection';
import styled from 'styled-components';

export const StyledTabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

`;

export const StyledTab = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.selected ? `#7cb342` : '#164E63'};
  border-bottom: ${props => props.selected ? `solid 2px #7cb342` : 'none'};
`;

export const Stats = (props) => {
	const [section, setSection] = useState('all');
	const [allData, setAllData] = useState(undefined);
	const [allTagData, setAllTagData] = useState(undefined);
	useEffect(() => {
		getRecap(setFullData);
		getTagRecap(setFullTagData);
	}, []);

	const setFullData = (data) => {
		if (!data) return;
		const fixedGroupedByMonth = [];
		const budgetGroupedByMonth = [];
		const incomeGroupedByMonth = [];
		fullDataWithTotal(data.fixed_costs, fixedGroupedByMonth);
		fullDataWithTotal(data.budget, budgetGroupedByMonth);
		fullDataWithTotal(data.income, incomeGroupedByMonth);
		setAllData(
			{
				fixed_costs: fixedGroupedByMonth,
				budget: budgetGroupedByMonth,
				income: incomeGroupedByMonth,
			}
		);
	};

	const setFullTagData = (data) => {
		if (!data) return;
		const byTagGroupedByMonth = [];
		fullDataWithTotal(data.byTag, byTagGroupedByMonth);
		console.log(byTagGroupedByMonth);
		setAllTagData(
			{
				byTag: byTagGroupedByMonth.sort((a, b) => (a.total > b.total) ? -1 : 1)
			}
		);
	};

	useEffect(() => {
		if (!allData) return;

	}, [allData]);
	return (
		<StyledScroll>
			<NavBar page={SECTIONS.STATS}/>
			{
				allData &&
				<StyledSection>
					<StyledTabs>
						<StyledTab
							selected={section === 'all'}
							onClick={() => setSection('all')}
						>
							Dati anno
						</StyledTab>
						<StyledTab
							selected={section === 'tag'}
							onClick={() => setSection('tag')}
						>
							Macro
						</StyledTab>
					</StyledTabs>
					{
						section === 'all' ?
							<>
								<AllDataSection data={allData.budget} title="Variabili"/>
								<AllDataSection data={allData.fixed_costs} title="Costi Fissi"/>
								<AllDataSection data={allData.income} title="Entrate"/>
							</> : <AllDataSection data={allTagData.byTag} title="Per macro"/>
					}

				</StyledSection>

			}
		</StyledScroll>
	);
};

