import styled from "styled-components";

const ListIsEmpty = () => {
  return (
    <Center>
      <p>List is empty</p>
      <Logo>jVocab</Logo>
    </Center>
  );
};

export default ListIsEmpty;

const Center = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-family: BalooChettan2-SemiBold;
  font-size: 1.5rem;
`;

const Logo = styled.p`
  border-radius: 50%;
  font-family: Brusher;
  font-size: 5rem;
`;
