import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { vocab } from "../data/Vocabolary";
import WordCard from "../helperComponents/WordCard";
import Pagination from "../helperComponents/Pagination";
import { Spinner } from "../helperComponents/StyledTags";
import ListIsEmpty from "../helperComponents/ListIsEmpty";

const ListByType = ({ vocabType }) => {
  const jlptLevel = useSelector((state) => state.jlptLevel.currentLevel);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const itemPerPage = 10;

  useEffect(() => {
    const pageFiltered = filteredData.filter((work, index) =>
      currentPageNo !== 1
        ? index >= (currentPageNo - 1) * itemPerPage && index < currentPageNo * itemPerPage
        : index < itemPerPage
    );
    setCurrentPageData([...pageFiltered]);

    setTimeout(() => {
      setIsPageLoading(false);
    }, 0);
  }, [currentPageNo, filteredData]);

  useEffect(() => {
    setIsPageLoading(true);
    const vocabByLevel = vocab.filter((word) => word.jlpt === jlptLevel);
    const typeFiltered = vocabByLevel.filter((word) => vocabType.includes(word.type));
    setFilteredData([...typeFiltered]);
  }, [jlptLevel, vocabType]);

  const handlePageClick = (selectedPage) => {
    setIsPageLoading(true);
    setCurrentPageNo(selectedPage);
  };

  return (
    <>
      {isPageLoading ? (
        <Spinner primaryColor={primaryColor} secondaryColor={secondaryColor} />
      ) : (
        <>
          <ScrollItems>
            <GridContainer>
              {currentPageData.length ? (
                currentPageData.map((item, index) => (
                  <WordCard
                    word={item}
                    key={index}
                    index={currentPageNo !== 1 ? itemPerPage * (currentPageNo - 1) + index : index}
                    withBookmark
                  />
                ))
              ) : (
                <ListIsEmpty />
              )}
            </GridContainer>
          </ScrollItems>

          {filteredData.length <= itemPerPage ? null : (
            <Pagination
              previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
              nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
              currentPage={currentPageNo}
              totalCount={filteredData.length}
              pageSize={itemPerPage}
              onPageChange={handlePageClick}
            />
          )}
        </>
      )}
    </>
  );
};

export default ListByType;

const ScrollItems = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 1rem;
  padding: 0 0.5rem;
`;
