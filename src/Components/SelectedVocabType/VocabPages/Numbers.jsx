import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import { Spinner } from "../../helperComponents/StyledTags";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Numbers = () => {
  return (
    <>
      <TopBar title='Numbers' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.numbers} />
      </Suspense>
    </>
  );
};

export default Numbers;
