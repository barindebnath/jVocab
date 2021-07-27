import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Numbers = () => {
  return (
    <>
      <TopBar title='Numbers' />
      <ListByType vocabType={vocabTypes.numbers} />
    </>
  );
};

export default Numbers;
