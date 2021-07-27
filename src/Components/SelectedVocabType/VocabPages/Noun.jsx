import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";
import { Spinner } from "../../helperComponents/StyledTags";

const Noun = () => {
  return (
    <>
      <TopBar title='Noun' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.noun} />
      </Suspense>
    </>
  );
};

export default Noun;
