import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { vocab } from "../data/Vocabolary";
import { setTotalWordsFound } from "../redux/searchSlice";
import WordCard from "../helperComponents/WordCard";

const SearchedList = ({ jlptLevel }) => {
  const searchValue = useSelector((state) => state.search.searchValue);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue.trim()) {
      const timeoutId = setTimeout(() => {
        setFilteredData([]);
        setIsPageLoading(true);

        const vocabByLevel = vocab.filter((word) => word.jlpt === jlptLevel);
        const filterFalsyValue = vocabByLevel.filter((word) => word.definition);

        const filteredArrays = filterFalsyValue.filter((word) => Array.isArray(word.definition));
        const filteredStrings = filterFalsyValue.filter((word) => !Array.isArray(word.definition));

        const searchedArrays = filteredArrays.filter(
          (word) => word.definition.toString().toLowerCase().search(searchValue.trim().toLowerCase()) !== -1
        );
        const searchedStrings = filteredStrings.filter(
          (word) => word.definition.toLowerCase().search(searchValue.trim().toLowerCase()) !== -1
        );

        dispatch(
          setTotalWordsFound({
            [jlptLevel]: searchedStrings.length + searchedArrays.length,
          })
        );

        setFilteredData([...searchedArrays, ...searchedStrings]);
        setTimeout(() => {
          setIsPageLoading(false);
        }, 0);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredData([]);
      dispatch(setTotalWordsFound({ n5: 0, n4: 0, n3: 0, n2: 0, n1: 0 }));
    }
  }, [searchValue, dispatch, jlptLevel]);

  return (
    <>
      {isPageLoading ? (
        <Spinner primaryColor={primaryColor} secondaryColor={secondaryColor} />
      ) : (
        <ScrollItems>
          <GridContainer>
            {filteredData.length
              ? filteredData.map((item, index) => <WordCard word={item} key={index} index={index} />)
              : null}
          </GridContainer>
        </ScrollItems>
      )}
    </>
  );
};

export default SearchedList;

const rotate = keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: ${({ secondaryColor }) => `1rem solid ${secondaryColor}`};
  border-top: ${({ primaryColor }) => `1rem solid ${primaryColor}`};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  margin: auto;
  animation: ${rotate} 2s linear infinite;
`;

const ScrollItems = styled.div`
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
`;
