import styled from "styled-components";
import { numberWithCommas } from './utils/numberWithCommas';

const StyledDigit = styled.div`
  color: ${props => props.color};
  text-align: left;
  margin-bottom: 4px;
`;

const StyledLabel = styled.div`
  text-transform: uppercase;
  font-size: 11px;
  ${props => props.labelRight && 'text-align: right;'}
  margin-top: 1px;
  font-weight: ${props => props.little ? 'normal' : 'bold'};
`;

const StyledNumber = styled.div`
  //font-weight: bold;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: ${props => props.little ? '28px' : '36px'};
  display: inline-block;
  line-height: 1;
  
`;

const StyledEuro = styled.div`
  font-size: 14px;
  display: inline-block;
`;

export const Digit = ({ lablel, val, colors, little, labelRight, white }) => {
  let color = white ? '#ffffff' : '#546E7A'
  if(colors){
    color = val < 0 ? '#E53935': '#7CB342'
  }
  return (
    <StyledDigit color={color}>
      <StyledNumber little={little}>{numberWithCommas(val)}</StyledNumber>
      <StyledEuro>€</StyledEuro>
      <StyledLabel labelRight={labelRight}>{lablel}</StyledLabel>
    </StyledDigit>
  );
}
