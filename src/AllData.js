import React from 'react';
import { AllDataSection } from './AllDataSection';
import { StyledSection } from './StyledSection';


export const AllData = ({ data, month }) => {
	return (
		<StyledSection>
			<AllDataSection data={data.budget} title='Variabili' month={month}/>
			<AllDataSection data={data.fixed_costs} title='Costi Fissi' month={month}/>
		</StyledSection>
	);
};

