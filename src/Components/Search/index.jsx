import styled from "styled-components";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { setSearchLevel } from "../redux/searchSlice";
import { HR } from "../helperComponents/StyledTags";
import RadioButton from "../helperComponents/RadioButton";
import SearchedList from "./SearchedList";

const Search = () => {
  const isSearchPanel = useSelector((state) => state.search.isSearchPanel);
  const isNavPanel = useSelector((state) => state.nav.isNavPanel);
  const searchLevel = useSelector((state) => state.search.searchLevel);
  const totalWordsFound = useSelector((state) => state.search.totalWordsFound);
  const primaryColor = useSelector((state) => state.theme.primary);

  return (
    <MainContainer isSearchPanel={isSearchPanel} isNavPanel={isNavPanel}>
      <SearchBar />

      <HR primaryColor={primaryColor} />

      <HFlex>
        <RadioButton value='n5' selectedValue={searchLevel} setValue={setSearchLevel} />
        <RadioButton value='n4' selectedValue={searchLevel} setValue={setSearchLevel} />
        <RadioButton value='n3' selectedValue={searchLevel} setValue={setSearchLevel} disabled />
        <RadioButton value='n2' selectedValue={searchLevel} setValue={setSearchLevel} />
        <RadioButton value='n1' selectedValue={searchLevel} setValue={setSearchLevel} disabled />
      </HFlex>
      <HFlex>
        <TotalWords>{totalWordsFound.n5}</TotalWords>
        <TotalWords>{totalWordsFound.n4}</TotalWords>
        <TotalWords>{totalWordsFound.n3}</TotalWords>
        <TotalWords>{totalWordsFound.n2}</TotalWords>
        <TotalWords>{totalWordsFound.n1}</TotalWords>
      </HFlex>

      <HR primaryColor={primaryColor} />

      {(() => {
        switch (searchLevel) {
          case "n5":
            return <SearchedList jlptLevel='n5' />;
          case "n4":
            return <SearchedList jlptLevel='n4' />;
          case "n3":
            return <SearchedList jlptLevel='n3' />;
          case "n2":
            return <SearchedList jlptLevel='n2' />;
          case "n1":
            return <SearchedList jlptLevel='n1' />;

          default:
            console.log("Current search nav: " + searchLevel);
            break;
        }
      })()}
    </MainContainer>
  );
};

export default Search;

const MainContainer = styled.div`
  flex: 1;
  padding: 0.5rem;
  flex-direction: column;
  @media (max-width: 768px) {
    display: ${({ isSearchPanel, isNavPanel }) => (isNavPanel ? "none" : isSearchPanel ? "flex" : "none")};
  }
  @media (min-width: 769px) {
    display: ${({ isSearchPanel }) => (isSearchPanel ? "flex" : "none")};
    max-width: 20rem;
  }
`;

const HFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalWords = styled.div`
  padding: 0.4rem 1.3rem 0;
`;
