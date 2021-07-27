import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Adjective = () => {
  return (
    <>
      <TopBar title='Adjective' />
      <ListByType vocabType={vocabTypes.adjective} />
    </>
  );
};

export default Adjective;
