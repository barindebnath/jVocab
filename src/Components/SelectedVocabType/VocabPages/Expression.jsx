import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";
import { Spinner } from "../../helperComponents/StyledTags";

const Expression = () => {
  return (
    <>
      <TopBar title='Expression' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.expression} />
      </Suspense>
    </>
  );
};

export default Expression;
