import styled from 'styled-components';

export const StyledHeader = styled.div`
  position: fixed;
  background-color: #fff;
  color: #546E7A;
  font-weight: bold;
  padding: 10px 20px;
  text-align: right;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  box-shadow: 2px 8px 4px #00000007;
`;

export const Header = ({ onClick, label }) => <StyledHeader>
	<span onClick={onClick}>{`${label} >`}</span>
</StyledHeader>;
