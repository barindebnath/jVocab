import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { usePagination, DOTS } from "./usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookmark, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, previousLabel, nextLabel } = props;
  const jlptLevel = useSelector((state) => state.jlptLevel.currentLevel);
  const currentScreen = useSelector((state) => state.nav.currentScreen);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const hoverColor = useSelector((state) => state.theme.hover);
  const disableColor = useSelector((state) => state.theme.disable);
  const currentPageBookmark = useSelector((state) => state.bookmark[`${jlptLevel}${currentScreen}`]);
  const [isGoTo, setIsGoTo] = useState(false);
  const [goToPageValue, setGoToPageValue] = useState("");
  const PageNavRef = useRef(null);
  const [pageNavWidth, setPageNavWidth] = useState(null);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  useEffect(() => {
    const handleResize = () => {
      PageNavRef.current && setPageNavWidth(PageNavRef.current.getBoundingClientRect().width);
    };
    window.addEventListener("resize", handleResize, false);
    return function cleanup() {
      window.removeEventListener("resize", handleResize, false);
    };
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  const handleGoToBookmark = () => {
    if (!currentPageBookmark) alert("Bookmark not found. Click on word card to bookmark.");
    else if (currentPageBookmark.length === 1) onPageChange(1);
    else {
      let intToString = currentPageBookmark.toString();
      let removeLastDigit = parseInt(intToString.substring(0, intToString.length - 1));
      let lastDigit = intToString.slice(-1);
      let isZero = lastDigit === "0";
      onPageChange(isZero ? removeLastDigit : removeLastDigit + 1);
    }
    setIsGoTo(false);
  };

  const handlePageNoSubmit = () => {
    onPageChange(parseInt(goToPageValue));
    setIsGoTo(false);
  };

  return (
    <>
      <PageNav isGoTo={isGoTo} ref={PageNavRef}>
        <HScroll pageNavWidth={pageNavWidth}>
          <UL>
            <LI
              disabled={currentPage === 1}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              hoverColor={hoverColor}
              disableColor={disableColor}
              onClick={() => currentPage !== 1 && onPrevious()}
            >
              {previousLabel}
            </LI>
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return (
                  <LI dots primaryColor={primaryColor} key={index + 1}>
                    &#8230;
                  </LI>
                );
              }

              return (
                <LI
                  active={pageNumber === currentPage}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  hoverColor={hoverColor}
                  disableColor={disableColor}
                  onClick={() => pageNumber !== currentPage && onPageChange(pageNumber)}
                  key={pageNumber}
                >
                  {pageNumber}
                </LI>
              );
            })}
            <LI
              disabled={currentPage === lastPage}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              hoverColor={hoverColor}
              disableColor={disableColor}
              onClick={() => currentPage !== lastPage && onNext()}
            >
              {nextLabel}
            </LI>
          </UL>
        </HScroll>
        <OpenGoIcon
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          hoverColor={hoverColor}
          onClick={() => setIsGoTo(true)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </OpenGoIcon>
      </PageNav>

      <GoToNav isGoTo={isGoTo}>
        <GoToBookmark primaryColor={primaryColor} secondaryColor={secondaryColor} onClick={handleGoToBookmark}>
          Open <FontAwesomeIcon icon={faBookmark} />
        </GoToBookmark>

        <GoToPageNo
          size='1'
          inputmode='numeric'
          maxLength='2'
          placeholder={`Go To Page (Max ${lastPage})`}
          value={goToPageValue}
          primaryColor={primaryColor}
          onChange={(e) => setGoToPageValue(e.target.value.replace(/[^0-9]/g, ""))}
        />

        {goToPageValue.trim() &&
        goToPageValue !== "0" &&
        goToPageValue !== "00" &&
        parseInt(goToPageValue) <= lastPage ? (
          <SubmitNoIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            hoverColor={hoverColor}
            onClick={handlePageNoSubmit}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </SubmitNoIcon>
        ) : (
          <CloseGoIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            hoverColor={hoverColor}
            onClick={() => setIsGoTo(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CloseGoIcon>
        )}
      </GoToNav>
    </>
  );
};

export default Pagination;

const PageNav = styled.div`
  display: ${({ isGoTo }) => (isGoTo ? "none" : "flex")};
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const HScroll = styled.div`
  flex: 1;
  overflow-x: auto;
  max-width: ${({ pageNavWidth }) =>
    pageNavWidth && pageNavWidth > 470 ? "100%" : `calc(${pageNavWidth}px - 1rem - 43px)`};
`;

const UL = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LI = styled.li`
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  font-family: BalooChettan2-SemiBold;
  cursor: ${({ disabled, active, dots }) => (active || disabled || dots ? "default" : "pointer")};
  background-color: ${({ active, primaryColor }) => (active ? primaryColor : "transparent")};
  color: ${({ disabled, active, primaryColor, secondaryColor, disableColor }) =>
    active ? secondaryColor : disabled ? disableColor : primaryColor};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ active, disabled, primaryColor, dots, hoverColor }) =>
        active ? primaryColor : disabled || dots ? false : hoverColor};
    }
  }
  &:active {
    background-color: ${({ primaryColor, disabled, dots }) => (disabled || dots ? false : primaryColor)};
    color: ${({ disabled, dots, secondaryColor }) => (disabled || dots ? false : secondaryColor)};
  }
`;

const OpenGoIcon = styled.span`
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
`;

const GoToNav = styled.div`
  display: ${({ isGoTo }) => (isGoTo ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const GoToBookmark = styled.div`
  padding: calc(0.7rem - 1px) 1.2rem;
  border-radius: 0.5rem;
  font-family: BalooChettan2-SemiBold;
  border: ${({ primaryColor }) => `1px solid ${primaryColor}`};
  cursor: pointer;
  &:active {
    background-color: ${({ primaryColor }) => primaryColor};
    color: ${({ secondaryColor }) => secondaryColor};
  }
`;

const GoToPageNo = styled.input`
  padding: calc(0.7rem - 1px) 1.2rem;
  border-radius: 0.5rem;
  font-family: BalooChettan2-SemiBold;
  border: ${({ primaryColor }) => `1px solid ${primaryColor}`};
  min-width: 1rem;
  flex: 1;
  margin: 0 0.5rem;
  font-size: 1rem;
  &:focus {
    outline-width: 0;
    outline: none;
  }
  &::focus-visible {
    outline-width: 0;
    outline: none;
  }
`;

const CloseGoIcon = styled.span`
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

const SubmitNoIcon = styled.span`
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
`;
