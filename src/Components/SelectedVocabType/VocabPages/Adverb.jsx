import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Adverb = () => {
  return (
    <>
      <TopBar title='Adverb' />
      <ListByType vocabType={vocabTypes.adverb} />
    </>
  );
};

export default Adverb;
