import styled from 'styled-components';
import React from 'react';
import { numberWithCommas } from './utils/numberWithCommas';

export const StyledNumber = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  ${props => props.red && `color:#E53935;`}
  ${props => props.green && `color:#7CB342;`}
`;

const StyledSubItems = styled.div`
  display: flex;

  * {
    width: 60px;
    text-align: right;
  }
`;
export const StyledDetail = styled.div`
  padding: 10px 0;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  border-bottom: solid 1px rgba(0, 0, 0, .1);

  &:last-child {
    border-bottom: none;
  }
`;

const showAmountWithSaving = (item, month) => {
	if (!item[`s${month}`]) return <StyledNumber>{numberWithCommas(item[`m${month}`])}€</StyledNumber>;
	return (
		<StyledSubItems>
			<StyledNumber>{numberWithCommas(item[`m${month}`])}€</StyledNumber>
			<StyledNumber
				red={item[`s${month}`] < 0}
				green={item[`s${month}`] > 0}
			>{numberWithCommas(item[`s${month}`])}€
			</StyledNumber>
		</StyledSubItems>
	);
};

export const AllDataSection = ({ data, title, month }) => (
	<>
		<h3>{title}</h3>
		{
			data.map(item =>
				<StyledDetail key={item.name}>
					<div>{item.name}</div>
					{
						month
							? showAmountWithSaving(item, month)
							: <StyledNumber>{numberWithCommas(item['total'])}€</StyledNumber>
					}

				</StyledDetail>
			)}
	</>
);



