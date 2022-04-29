import { useContext, useState } from "react";
import styled, {css, keyframes} from "styled-components";
import { AppContext } from './App';

const enter = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;


const StyledDisplay = styled.div`
  padding: 80px 23px 33px 23px;
  margin: 0;
  background-color: ${({removing}) => removing ? '#E64A19' : `#d4e157`};
  text-align: center;
  font-size: 42px;
  position: relative;
  transition: all .3s linear;
  color: ${props => props.removing ? '#fff' : `#000`};
  animation: ${({ saveStatus }) =>
    saveStatus === 'saved!'
      ? css`
        ${enter} 0.7s linear alternate
      `
      : css``
  };
  span {
    font-size: 22px;
  }
`;

const StyledAmount = styled.div`
  font-size: 64px;
  font-weight: bold;
  display: inline-block;
`;

const StyledOptions = styled.div`
  position: absolute;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 20px;
`;

const StyledBack = styled(StyledOptions)`
  left: 0;
  top: 0;
`;

const StyledRemove = styled(StyledOptions)`
  right: 0;
  top: 0;
`;

const StyledStatus = styled(StyledOptions)`
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: 20px;
  font-style: italic;
`;



export const Display = ({ val, callbackRemove, saveStatus }) => {
  const [removing, setRemoving] = useState(false);
  const { openCategory } = useContext(AppContext);
  const onRemove = () => {
    callbackRemove(!removing)
    setRemoving(!removing);
  }
  return (
    <StyledDisplay removing={removing} saveStatus={saveStatus}>
      <StyledBack onClick={openCategory}>{" < Back"}</StyledBack>
      <StyledRemove onClick={onRemove}>Remove</StyledRemove>
      <StyledAmount>{removing ? '-' : ''}{val}</StyledAmount>
      <StyledStatus>{saveStatus}</StyledStatus>
      <span>€</span>
    </StyledDisplay>
  );
}
