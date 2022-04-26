import styled from "styled-components";

const StyledKB = styled.div`
  cursor: pointer;
  height: 58px;
  margin-bottom: 5px;
  background-color: #fefefe;
  border-radius: 8px;
  position: relative;
  font-size: 36px;
  min-width: 31%;
  color: #455a64;
  cursor: pointer;
  span {
    position: absolute;
    user-select: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const KeyboardButton = ({ value, clickHandler }) => (
  <StyledKB onClick={() => clickHandler(value)}>
    <span>{value}</span>
  </StyledKB>
);
