import styled from "styled-components";
import { calculateBar } from './calculateBar';



const StyledBar = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

const StyledBarContainer = styled.div`
  height: ${props => props.barHeight}px;
  position: relative;
  border-radius: ${props => props.barHeight / 2}px;
  width: 100%;
  background-color: #ddd;
`;

const StyledMax = styled.div`
  height: ${props => props.barHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}%;
  background-color: #7cb342;
  border-radius: ${props => props.barHeight / 2}px;
  overflow: hidden;
  box-shadow: inset 0px 2px 1px rgba(0,0,0,0.2);
  transition: all .3s ease-in-out;
`;


const StyledAmount = styled.div`
  height: ${props => props.barHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}%;
  border-radius: ${props => props.barHeight / 2}px;
  background-color: #1565c0;
  transition: all .3s ease-in-out;
`;

const StyledAmountExceed = styled.div`
  height: ${props => props.barHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}%;
  border-radius: ${props => props.barHeight / 2}px;
  background-color: #f44336;
  transition: all .3s ease-in-out;
`;

const StyledLabel = styled.div`
  margin-bottom: 5px;
  color: #555;
  text-transform: uppercase;
  font-size: 15px;
  text-align: ${props => props.left ? 'left': 'center'};
`;


export const Bar = ({ max, amount, label, slim, left }) => {
  const barHeight = slim ? 10 : 20;
  const { widthAmount, widthMax } = calculateBar(max, amount);
  return (
    <StyledBar>
      {label && <StyledLabel left={left}>{label}</StyledLabel>}
      <StyledBarContainer barHeight={barHeight}>
        <StyledAmountExceed width={widthAmount} barHeight={barHeight}/>
        <StyledMax width={widthMax} barHeight={barHeight}>
          <StyledAmount width={widthAmount} barHeight={barHeight}/>
        </StyledMax>
      </StyledBarContainer>
    </StyledBar>
  );
};
