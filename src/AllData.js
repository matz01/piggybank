import React from 'react';
import { AllDataSection } from './AllDataSection';
import { StyledSection } from './StyledSection';


export const AllData = ({ data, month }) => {
	const { variables, fixed, inc } = data;
	return (
		<StyledSection>
			<AllDataSection data={variables} title="Variabili" month={month}/>
			<AllDataSection data={fixed} title="Fisse" month={month}/>
			<AllDataSection data={inc} title="Entrate" month={month}/>
		</StyledSection>
	);
};

