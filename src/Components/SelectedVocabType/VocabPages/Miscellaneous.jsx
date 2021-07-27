import { vocabTypes } from "../../data/Vocabolary";
import ListByType from "../ListByType";
import TopBar from "../TopBar";

const Miscellaneous = () => {
  return (
    <>
      <TopBar title='Miscellaneous' />
      <ListByType vocabType={vocabTypes.miscellaneous} />
    </>
  );
};

export default Miscellaneous;
