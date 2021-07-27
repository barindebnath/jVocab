import styled from "styled-components";
import { useSelector } from "react-redux";
import Home from "./Home";
import Adjective from "./VocabPages/Adjective";
import Adverb from "./VocabPages/Adverb";
import Conjunction from "./VocabPages/Conjunction";
import Expression from "./VocabPages/Expression";
import Miscellaneous from "./VocabPages/Miscellaneous";
import Noun from "./VocabPages/Noun";
import Numbers from "./VocabPages/Numbers";
import Verb from "./VocabPages/Verb";

const SelectedVocabType = () => {
  const isSearchPanel = useSelector((state) => state.search.isSearchPanel);
  const isNavPanel = useSelector((state) => state.nav.isNavPanel);
  const currentScreen = useSelector((state) => state.nav.currentScreen);

  return (
    <MainContainer isSearchPanel={isSearchPanel} isNavPanel={isNavPanel}>
      {(() => {
        switch (currentScreen) {
          case "Home":
            return <Home />;

          case "Adjective":
            return <Adjective />;

          case "Adverb":
            return <Adverb />;

          case "Conjunction":
            return <Conjunction />;

          case "Expression":
            return <Expression />;

          case "Miscellaneous":
            return <Miscellaneous />;

          case "Noun":
            return <Noun />;

          case "Numbers":
            return <Numbers />;

          case "Verb":
            return <Verb />;

          default:
            console.warn("current screen : " + currentScreen);
            return null;
        }
      })()}
    </MainContainer>
  );
};

export default SelectedVocabType;

const MainContainer = styled.div`
  flex: 2;
  padding: 0.5rem;
  flex-direction: column;
  @media (max-width: 768px) {
    display: ${({ isSearchPanel, isNavPanel }) => (isSearchPanel || isNavPanel ? "none" : "flex")};
    height: calc(100vh - 1rem);
  }
  @media (min-width: 769px) {
    display: flex;
  }
`;
