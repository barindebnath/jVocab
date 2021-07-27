import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Verb = () => {
  return (
    <>
      <TopBar title='Verb' />
      <ListByType vocabType={vocabTypes.verb} />
    </>
  );
};

export default Verb;
