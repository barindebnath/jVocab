import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";
import { Spinner } from "../../helperComponents/StyledTags";

const Miscellaneous = () => {
  return (
    <>
      <TopBar title='Miscellaneous' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.miscellaneous} />
      </Suspense>
    </>
  );
};

export default Miscellaneous;
