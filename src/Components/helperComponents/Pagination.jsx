import { useSelector } from "react-redux";
import styled from "styled-components";
import { usePagination, DOTS } from "./usePagination";

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, previousLabel, nextLabel } = props;
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const hoverColor = useSelector((state) => state.theme.hover);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
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
  return (
    <UL>
      <LI
        disabled={currentPage === 1}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        hoverColor={hoverColor}
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
        onClick={() => currentPage !== lastPage && onNext()}
      >
        {nextLabel}
      </LI>
    </UL>
  );
};

export default Pagination;

const UL = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 1rem 0 0 0;
  margin: 0;
  overflow-x: auto;
`;

const LI = styled.li`
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  font-family: BalooChettan2-SemiBold;
  cursor: ${({ disabled, active, dots }) => (active || disabled || dots ? "default" : "pointer")};
  background-color: ${({ active, primaryColor }) => (active ? primaryColor : "transparent")};
  color: ${({ disabled, active, primaryColor, secondaryColor }) =>
    active ? secondaryColor : disabled ? "#d1d5db" : primaryColor};
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
