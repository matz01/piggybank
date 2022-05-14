import React from 'react';
import styled from 'styled-components';
import { AllDataSection } from './AllDataSection';


const StyledSection = styled.div`
  padding: 10px 50px 70px 50px;
  color: ${props => props.theme.text};

  h3 {
    margin: 40px 0 20px 0;
  }
`;

export const AllData = ({ data, month }) => {
	return (
		<StyledSection>
			<AllDataSection data={data.budget} title='Variabili' month={month}/>
			<AllDataSection data={data.fixed_costs} title='Costi Fissi' month={month}/>
		</StyledSection>
	);
};

