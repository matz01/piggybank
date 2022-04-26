import styled from "styled-components";
import { AppContext } from './App';
import { useContext, useEffect, useState } from 'react';
import { Bar } from './Bar';
import { getMonth } from './utils/getMonth';
import { getSummary } from './utils/getSummary';

const StyledSituation = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

const StyledItem = styled.div`
  min-width: 100%;
`;
//

export const Monthly = () => {
	const [summary, setSummary] = useState([]);
	const { budget, openCategory } = useContext(AppContext);
	const month = getMonth();

	useEffect(() => {
		getSummary(month, budget, setSummary);
	}, []);


	return (
		<StyledSituation onClick={openCategory}>
			{summary.filter(o => o[`m${month}`] > 0 || o.spent > 0).map(item => {
				const max = item[`m${month}`];
				return (
					<StyledItem key={item.name}>
						<Bar
							slim
							left
							amount={item.spent}
							max={max}
							label={`${item.name} | ${item.spent}€ su ${max}€`}
						/>
					</StyledItem>
				);
			})}
		</StyledSituation>
	);
};

