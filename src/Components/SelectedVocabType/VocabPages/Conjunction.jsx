import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Conjunction = () => {
  return (
    <>
      <TopBar title='Conjunction' />
      <ListByType vocabType={vocabTypes.conjunction} />
    </>
  );
};

export default Conjunction;
