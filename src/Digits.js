import styled from "styled-components";

const StyledDigit = styled.div`
  color: ${props => props.color};
  text-align: left;
`;

const StyledLabel = styled.div`
  margin-bottom: -5px;
  text-transform: uppercase;
  font-size: 11px;
`;

const StyledNumber = styled.div`
  font-weight: bold;
  font-size: 32px;
  display: inline-block;
`;

const StyledEuro = styled.div`
  font-size: 12px;
  display: inline-block;
`;

export const Digit = ({ lablel, val, colors }) => {
  let color = '#333'
  if(colors){
    color = val < 0 ? '#8a051c': '#126538'
  }
  return (
    <StyledDigit color={color}>
      <StyledLabel>{lablel}</StyledLabel>
      <StyledNumber>{val}</StyledNumber>
      <StyledEuro>€</StyledEuro>
    </StyledDigit>
  );
}
