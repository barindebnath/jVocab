import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Noun = () => {
  return (
    <>
      <TopBar title='Noun' />
      <ListByType vocabType={vocabTypes.noun} />
    </>
  );
};

export default Noun;
