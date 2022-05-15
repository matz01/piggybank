import styled from 'styled-components';
import React from 'react';
import { numberWithCommas } from './utils/numberWithCommas';

export const StyledNumber = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
`;
export const StyledDetail = styled.div`
  padding: 10px 0;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  border-top: solid 1px rgba(0, 0, 0, .1);
`;

export const AllDataSection = ({ data, title, month }) => (
	<>
		<h3>{title}</h3>
		{
		data.map(item =>
			<StyledDetail key={item.name}>
				<div>{item.name}</div>
				{
					month
					? <StyledNumber>{numberWithCommas(item[`m${month}`])}€</StyledNumber>
					: <StyledNumber>{numberWithCommas(item['total'])}€</StyledNumber>
				}

			</StyledDetail>
		)}
	</>
)



