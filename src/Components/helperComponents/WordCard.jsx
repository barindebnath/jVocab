import { useSelector } from "react-redux";
import styled from "styled-components";

const WordCard = ({ word, index }) => {
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);

  return (
    <VFlex primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <Row>
        <Text>{word.kana}</Text>

        {word.kanji ? <Text>{word.kanji}</Text> : null}
      </Row>

      <Row>
        <Text>
          {word.definition
            ? Array.isArray(word.definition)
              ? word.definition.join(" | ").toString()
              : word.definition
            : "-"}
        </Text>
      </Row>

      <Row>
        <small>{word.type ? word.type.replace(/,/g, " | ") : ""}</small>
        <small>{index + 1}</small>
      </Row>
    </VFlex>
  );
};

export default WordCard;

const VFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${({ primaryColor }) => primaryColor};
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${({ secondaryColor }) => secondaryColor};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-family: BalooChettan2-SemiBold;
`;
