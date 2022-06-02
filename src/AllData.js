import React from 'react';
import { AllDataSection } from './AllDataSection';
import { StyledSection } from './StyledSection';
import { budgetAndTransactions, mappedCosts } from './utils/budgetAndTransactions';


export const AllData = ({ data, month }) => {
	const variables = budgetAndTransactions(data)
	const {mappedFC, mappedIncome} = mappedCosts(data, month)

	console.log(variables)
	return (
		<StyledSection>
			<AllDataSection data={[...variables, ...mappedFC]} title='Uscite' month={month}/>
			<AllDataSection data={mappedIncome} title='Entrate' month={month}/>
		</StyledSection>
	);
};

