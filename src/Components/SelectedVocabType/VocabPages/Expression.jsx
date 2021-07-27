import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Expression = () => {
  return (
    <>
      <TopBar title='Expression' />
      <ListByType vocabType={vocabTypes.expression} />
    </>
  );
};

export default Expression;
