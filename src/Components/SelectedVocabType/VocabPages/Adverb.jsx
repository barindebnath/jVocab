import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";
import { Spinner } from "../../helperComponents/StyledTags";

const Adverb = () => {
  return (
    <>
      <TopBar title='Adverb' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.adverb} />
      </Suspense>
    </>
  );
};

export default Adverb;
