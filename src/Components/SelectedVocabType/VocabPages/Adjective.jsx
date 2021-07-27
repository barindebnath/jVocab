import { Suspense } from "react";
import { vocabTypes } from "../../data/Vocabolary";
import { Spinner } from "../../helperComponents/StyledTags";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Adjective = () => {
  return (
    <>
      <TopBar title='Adjective' />
      <Suspense fallback={<Spinner />}>
        <ListByType vocabType={vocabTypes.adjective} />
      </Suspense>
    </>
  );
};

export default Adjective;
