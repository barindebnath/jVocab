import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { openSearchPanel } from "../redux/searchSlice";
import { openNavPanel } from "../redux/navSlice";

const TopBar = ({ title }) => {
  const isSearchPanel = useSelector((state) => state.search.isSearchPanel);
  const isNavPanel = useSelector((state) => state.nav.isNavPanel);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const hoverColor = useSelector((state) => state.theme.hover);
  const dispatch = useDispatch();

  return (
    <HFlex>
      <BarsIcon
        primaryColor={primaryColor}
        hoverColor={hoverColor}
        secondaryColor={secondaryColor}
        isNavPanel={isNavPanel}
        onClick={() => dispatch(openNavPanel())}
      >
        <FontAwesomeIcon icon={faBars} />
      </BarsIcon>

      <Text>{title}</Text>

      <SearchIcon
        primaryColor={primaryColor}
        hoverColor={hoverColor}
        secondaryColor={secondaryColor}
        isSearchPanel={isSearchPanel}
        onClick={() => dispatch(openSearchPanel())}
      >
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>
    </HFlex>
  );
};

export default TopBar;

const HFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-family: BalooChettan2-SemiBold;
`;

const BarsIcon = styled.span`
  visibility: ${({ isNavPanel }) => (isNavPanel ? "hidden" : "visible")};
  padding: 0.7rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  &:active {
    background-color: ${({ primaryColor }) => primaryColor};
    color: ${({ secondaryColor }) => secondaryColor};
  }
  @media (max-width: 768px) {
    visibility: ${({ isNavPanel }) => (isNavPanel ? "hidden" : "visible")};
  }
  @media (min-width: 769px) {
    /* visibility: hidden; */
  }
`;

const SearchIcon = styled.span`
  visibility: ${({ isSearchPanel }) => (isSearchPanel ? "hidden" : "visible")};
  padding: 0.7rem 0.9rem;
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
