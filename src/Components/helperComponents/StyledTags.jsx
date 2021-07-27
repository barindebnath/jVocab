import styled from "styled-components";

export const HR = styled.hr`
  width: 100%;
  border: none;
  border-top: ${({ primaryColor }) => `1px solid ${primaryColor}`};
`;
