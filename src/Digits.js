import styled from "styled-components";

const StyledDigit = styled.div`
  color: ${props => props.color};
  text-align: left;
  margin-bottom: 4px;
`;

const StyledLabel = styled.div`
  margin-bottom: 0;
  text-transform: uppercase;
  font-size: 9px;
`;

const StyledNumber = styled.div`
  font-weight: bold;
  font-size: ${props => props.little ? '18px' : '30px'};
  display: inline-block;
  line-height: 1;
`;

const StyledEuro = styled.div`
  font-size: 12px;
  display: inline-block;
`;

export const Digit = ({ lablel, val, colors, little }) => {
  let color = '#546E7A'
  if(colors){
    color = val < 0 ? '#8a051c': '#7CB342'
  }
  return (
    <StyledDigit color={color}>
      <StyledLabel>{lablel}</StyledLabel>
      <StyledNumber little={little}>{val}</StyledNumber>
      <StyledEuro>€</StyledEuro>
    </StyledDigit>
  );
}
