import styled from "styled-components";

const StyledKeyboard = styled.div`
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
`;
export const Keyboard = ({ children }) => (
  <StyledKeyboard>{children}</StyledKeyboard>
);
