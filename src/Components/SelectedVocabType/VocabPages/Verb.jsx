import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import { Spinner } from "../../helperComponents/StyledTags";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Verb = () => {
  return (
    <>
      <TopBar title='Verb' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.verb} />
      </Suspense>
    </>
  );
};

export default Verb;
