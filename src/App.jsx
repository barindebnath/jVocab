import styled from "styled-components";
import NavList from "./Components/NavList";
import SelectedVocabType from "./Components/SelectedVocabType";
import Search from "./Components/Search";
import { useSelector } from "react-redux";

const App = () => {
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);

  return (
    <ParentRoot primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <NavList />
      <SelectedVocabType />
      <Search />
    </ParentRoot>
  );
};

export default App;

const ParentRoot = styled.div`
  display: flex;
  font-family: BalooChettan2-Regular;
  background-color: ${({ secondaryColor }) => secondaryColor};
  color: ${({ primaryColor }) => primaryColor};
  @media (max-width: 768px) {
    height: 100vh;
  }
  @media (min-width: 769px) {
    flex-direction: row;
    height: 100vh;
  }
`;
