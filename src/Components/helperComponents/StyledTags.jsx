import styled, { keyframes } from "styled-components";

export const HR = styled.hr`
  width: 100%;
  border: none;
  border-top: ${({ primaryColor }) => `1px solid ${primaryColor}`};
`;

const rotate = keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: ${({ secondaryColor }) => `1rem solid ${secondaryColor}`};
  border-top: ${({ primaryColor }) => `1rem solid ${primaryColor}`};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  margin: auto;
  animation: ${rotate} 2s linear infinite;
`;
