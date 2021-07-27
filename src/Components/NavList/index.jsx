import styled from "styled-components";
import { HuePicker } from "react-color";
import { abbreviations } from "../data/Vocabolary";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeNavPanel, setCurrentScreen } from "../redux/navSlice";
import { setLevel } from "../redux/jlptLevelSlice";
import { setDarkTheme, setLightTheme, setPrimaryColor } from "../redux/themeSlice";
import { HR } from "../helperComponents/StyledTags";
import RadioButton from "../helperComponents/RadioButton";

const NavList = () => {
  const jlptLevel = useSelector((state) => state.jlptLevel.currentLevel);
  const isNavPanel = useSelector((state) => state.nav.isNavPanel);
  const currentScreen = useSelector((state) => state.nav.currentScreen);
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const hoverColor = useSelector((state) => state.theme.hover);
  const isDarktheme = useSelector((state) => state.theme.isDarktheme);
  const colorPickerValue = useSelector((state) => state.theme.colorPickerValue);
  const dispatch = useDispatch();

  const ThemeSwitch = () => {
    if (isDarktheme)
      return (
        <ThemeIcon onClick={() => dispatch(setLightTheme())} hoverColor={hoverColor}>
          🌞
        </ThemeIcon>
      );
    else
      return (
        <ThemeIcon onClick={() => dispatch(setDarkTheme())} hoverColor={hoverColor}>
          🌚
        </ThemeIcon>
      );
  };

  return (
    <MainContainer isNavPanel={isNavPanel}>
      <HFlex>
        <NavItem
          active={currentScreen === "Home"}
          onClick={() => {
            dispatch(setCurrentScreen("Home"));
          }}
          primaryColor={primaryColor}
          hoverColor={hoverColor}
          secondaryColor={secondaryColor}
          style={{ marginBottom: 0 }}
        >
          <Emoji>🏠</Emoji>
          <Text style={{ paddingRight: ".7rem" }}>Home</Text>
        </NavItem>
        <CloseIcon
          isNavPanel={isNavPanel}
          primaryColor={primaryColor}
          hoverColor={hoverColor}
          secondaryColor={secondaryColor}
          onClick={() => dispatch(closeNavPanel())}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CloseIcon>
      </HFlex>

      <HR primaryColor={primaryColor} />

      <ScrollItems>
        <div>
          {abbreviations.map((item) => {
            return (
              <NavItem
                active={currentScreen === item.name}
                key={item.id}
                onClick={() => {
                  dispatch(setCurrentScreen(item.name));
                }}
                primaryColor={primaryColor}
                hoverColor={hoverColor}
                secondaryColor={secondaryColor}
              >
                <Emoji>{item.emoji}</Emoji>
                <Text>{item.name}</Text>
              </NavItem>
            );
          })}
          <NavItem
            active={currentScreen === "DefinitionLess"}
            onClick={() => {
              dispatch(setCurrentScreen("DefinitionLess"));
            }}
            primaryColor={primaryColor}
            hoverColor={hoverColor}
            secondaryColor={secondaryColor}
          >
            <Emoji>😑</Emoji>
            <Text>Definition Less</Text>
          </NavItem>
        </div>
      </ScrollItems>

      <HR primaryColor={primaryColor} />

      <HFlex>
        {/* <Title>JLPT Level</Title> */}
        <RadioButton value='n5' selectedValue={jlptLevel} setValue={setLevel} />
        <RadioButton value='n4' selectedValue={jlptLevel} setValue={setLevel} />
        <RadioButton value='n3' selectedValue={jlptLevel} setValue={setLevel} disabled />
        <RadioButton value='n2' selectedValue={jlptLevel} setValue={setLevel} />
        <RadioButton value='n1' selectedValue={jlptLevel} setValue={setLevel} disabled />
      </HFlex>

      <HR primaryColor={primaryColor} />

      <HFlex>
        <ThemeSwitch />
        <div style={{ flex: 1 }}>
          <HuePicker
            color={colorPickerValue}
            onChangeComplete={(color) => dispatch(setPrimaryColor(color.hsl.h))}
            width='auto'
          />
        </div>
      </HFlex>
    </MainContainer>
  );
};

export default NavList;

const MainContainer = styled.div`
  display: ${({ isNavPanel }) => (isNavPanel ? "flex" : "none")};
  flex: 1;
  flex-direction: column;
  padding: 0.5rem;
  position: relative;
  @media (min-width: 769px) {
    max-width: 20rem;
  }
`;

const HFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ScrollItems = styled.div`
  flex: 1;
  overflow: auto;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${({ active, primaryColor }) => (active ? primaryColor : false)};
  color: ${({ active, secondaryColor }) => (active ? secondaryColor : false)};
  &:hover {
    background-color: ${({ active, hoverColor }) => (active ? false : hoverColor)};
  }
  &:active {
    background-color: ${({ primaryColor }) => primaryColor};
    color: ${({ secondaryColor }) => secondaryColor};
  }
`;

const Emoji = styled.div`
  margin-right: 0.7rem;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  font-family: BalooChettan2-SemiBold;
  text-transform: capitalize;
`;

const CloseIcon = styled.span`
  display: ${({ isNavPanel }) => (isNavPanel ? "block" : "none")};
  padding: 0.7rem 1.1rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
  &:active {
    background-color: ${({ primaryColor }) => primaryColor};
    color: ${({ secondaryColor }) => secondaryColor};
  }
`;

const ThemeIcon = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;
