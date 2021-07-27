import React, { useEffect, useState, useRef } from "react";
import TopBar from "../TopBar";
import {
  FlatList,
  Heading,
  Spinner,
  Center,
  useColorModeValue,
  HStack,
  ChevronUpIcon,
  SmallCloseIcon,
  Box,
  Slide,
  Input,
  VStack,
  Fade,
  Button,
  useToast,
  ArrowForwardIcon,
} from "native-base";
import { useSelector } from "react-redux";
import { vocab } from "../Vocabolary";
import WordCard from "./WordCard";

const DefinitionLess = ({ navigation }) => {
  const jlptLevel = useSelector((state) => state.jlptLevel.currentLevel);
  const flatListRef = useRef(null);
  const toastGotoIndex = useToast();
  const toastID1 = "greater no.";
  const toastID2 = "less than 1";
  const toastID3 = "empty list";
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [goToIndex, setGoToIndex] = useState("");

  useEffect(() => {
    setIsPageLoading(true);
    const vocabByLevel = vocab.filter((word) => word.jlpt == jlptLevel);
    const definitionLessWords = vocabByLevel.filter((word) => !word.definition);
    setFilteredData([...definitionLessWords]);
    setTimeout(() => {
      setIsPageLoading(false);
    }, 0);
  }, [jlptLevel]);

  const handleGoToSubmit = () => {
    if (filteredData.length == 0) {
      if (!toastGotoIndex.isActive(toastID3)) {
        toastGotoIndex.show({
          id: toastID3,
          title: "List is empty",
          status: "warning",
        });
      }
    } else if (goToIndex === "0") {
      console.log("correct " + goToIndex);
      if (!toastGotoIndex.isActive(toastID2)) {
        toastGotoIndex.show({
          id: toastID2,
          title: "Invalid",
          status: "warning",
          description: `Please enter number greater than 0`,
        });
      }
    } else if (goToIndex > filteredData.length) {
      console.log("wrong " + goToIndex);
      if (!toastGotoIndex.isActive(toastID1)) {
        toastGotoIndex.show({
          id: toastID1,
          title: "Invalid",
          status: "warning",
          description: `Please enter number in range 1 to ${filteredData.length}`,
        });
      }
    } else {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: parseInt(goToIndex) - 1,
        });
        setIsInfoOpen(false);
        setGoToIndex("");
      }
    }
  };

  return (
    <VStack px={4} display='flex' flex={1}>
      <TopBar navigation={navigation} title='Definition Less' />
      {isPageLoading ? (
        <Center width='100%' height='100%'>
          <Spinner color={useColorModeValue("lightBlue.900", "lightBlue.400")} accessibilityLabel='Loading Words' />
        </Center>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={filteredData}
            renderItem={({ item, index }) => <WordCard word={item} index={index} />}
            keyExtractor={(nan, index) => index}
            getItemLayout={(data, index) => {
              return { length: 184, index, offset: 184 * index };
            }}
          />

          <Box position='absolute' top={0} left={0} right={0} bottom={1} justifyContent='flex-end' alignItems='center'>
            <Fade in={!isInfoOpen}>
              <Button
                onPress={() => setIsInfoOpen(true)}
                rounded='pill'
                bg='transparent'
                size='md'
                colorScheme='lightBlue'
              >
                <ChevronUpIcon size='sm' color='#f3f4f6' />
              </Button>
            </Fade>
          </Box>

          <Slide in={isInfoOpen} position='relative'>
            <HStack p={2} bg='white' space={2}>
              <HStack flex={1}>
                <Input
                  // type="text"
                  keyboardType='numeric'
                  maxLength={5}
                  placeholder={`${filteredData.length} words`}
                  value={goToIndex}
                  onChangeText={(value) => setGoToIndex(value.replace(/[^0-9]/g, ""))}
                  variant='filled'
                  roundedRight='none'
                  size='xl'
                  flex={1}
                  border='none'
                  _focus={{
                    border: "none",
                  }}
                />
                <Button
                  bg='lightBlue.700'
                  roundedLeft='none'
                  onPress={handleGoToSubmit}
                  style={{ aspectRatio: 1 }}
                  isDisabled={!goToIndex}
                  colorScheme='lightBlue'
                >
                  <ArrowForwardIcon size='sm' />
                </Button>
              </HStack>
              <VStack justifyContent='space-between'>
                <Button
                  onPress={() => setIsInfoOpen(false)}
                  style={{ aspectRatio: 1 }}
                  height={5}
                  p={1}
                  colorScheme='red'
                  _text={{
                    color: "white",
                  }}
                >
                  <SmallCloseIcon size='sm' color='white' />
                </Button>
                <Heading textTransform='uppercase' color='black' size='xs'>
                  {jlptLevel}
                </Heading>
              </VStack>
            </HStack>
          </Slide>
        </>
      )}
    </VStack>
  );
};

export default DefinitionLess;
