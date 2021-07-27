import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { closeSearchPanel, setSearchValue } from "../redux/searchSlice";

const SearchBar = () => {
  const searchValue = useSelector((state) => state.search.searchValue);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const hoverColor = useSelector((state) => state.theme.hover);
  const dispatch = useDispatch();

  return (
    <HFlex>
      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>

      <SearchInput
        size='1'
        placeholder='Global Search'
        value={searchValue}
        primaryColor={primaryColor}
        onChange={(e) => {
          e.preventDefault();
          dispatch(setSearchValue(e.target.value));
        }}
      />

      <CloseIcon
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        hoverColor={hoverColor}
        onClick={() => dispatch(closeSearchPanel())}
      >
        <FontAwesomeIcon icon={faTimes} />
      </CloseIcon>
    </HFlex>
  );
};

export default SearchBar;

const HFlex = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  margin: 0;
  font-size: 1rem;
  font-family: BalooChettan2-SemiBold;
  padding: 0.7rem 1rem;
  border: none;
  min-width: 1rem;
  flex: 1;
  background-color: transparent;
  color: ${({ primaryColor }) => primaryColor};
  &:focus {
    outline-width: 0;
    outline: none;
  }
  &::focus-visible {
    outline-width: 0;
    outline: none;
  }
`;

const SearchIcon = styled.span`
  padding: 0.7rem;
`;

const CloseIcon = styled.span`
  padding: 0.7rem 1.1rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  &:active {
    background-color: ${({ primaryColor }) => primaryColor};
    color: ${({ secondaryColor }) => secondaryColor};
  }
`;
