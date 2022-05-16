import React from 'react';
import { AllDataSection } from './AllDataSection';
import { StyledSection } from './StyledSection';


export const AllData = ({ data, month }) => {

	return (
		<StyledSection>
			<AllDataSection data={[...data.budget, ...data.fixed_costs]} title='Uscite' month={month}/>
			<AllDataSection data={data.income} title='Entrate' month={month}/>
		</StyledSection>
	);
};

