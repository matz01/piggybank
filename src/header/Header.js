import styled from 'styled-components';

export const StyledHeader = styled.div`
  position: fixed;
  background-color: #fff;
  color: #546E7A;
  font-weight: bold;
  padding: 5px 0;
	max-width: 150px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
	margin: auto;
	text-align: center;
  box-shadow: 2px 8px 4px #00000007;
`;

export const Header = ({ onClick, label }) => <StyledHeader>
	<span onClick={onClick}>{`${label} >`}</span>
</StyledHeader>;
