import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";
import { Spinner } from "../../helperComponents/StyledTags";

const Conjunction = () => {
  return (
    <>
      <TopBar title='Conjunction' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.conjunction} />
      </Suspense>
    </>
  );
};

export default Conjunction;
