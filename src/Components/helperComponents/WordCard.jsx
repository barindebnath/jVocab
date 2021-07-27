import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { setBookmark } from "../redux/bookmarkSlice";

const WordCard = ({ word, index, withBookmark }) => {
  const jlptLevel = useSelector((state) => state.jlptLevel.currentLevel);
  const currentScreen = useSelector((state) => state.nav.currentScreen);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const isDarktheme = useSelector((state) => state.theme.isDarktheme);
  const bookmark = useSelector((state) => state.bookmark[`${jlptLevel}${currentScreen}`]);
  const dispatch = useDispatch();

  const handleBookmarkWord = () => {
    if (withBookmark) {
      localStorage.setItem(`${jlptLevel}${currentScreen}`, index + 1);
      dispatch(setBookmark({ name: `${jlptLevel}${currentScreen}`, value: index + 1 }));
    }
  };

  return (
    <VFlex
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      isDarktheme={isDarktheme}
      onClick={handleBookmarkWord}
      withBookmark={withBookmark}
    >
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

        {withBookmark ? bookmark === index + 1 ? <FontAwesomeIcon icon={faBookmark} /> : null : null}
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
  background-color: ${({ isDarktheme, secondaryColor, primaryColor }) => (isDarktheme ? secondaryColor : primaryColor)};
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${({ isDarktheme, primaryColor, secondaryColor }) => (isDarktheme ? primaryColor : secondaryColor)};
  cursor: ${({ withBookmark }) => (withBookmark ? "pointer" : "default")};
  border: ${({ primaryColor }) => `1px solid ${primaryColor}`};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-family: BalooChettan2-SemiBold;
`;
