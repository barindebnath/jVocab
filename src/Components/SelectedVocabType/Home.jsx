import styled from "styled-components";
import { useSelector } from "react-redux";
import TopBar from "./TopBar";
import { abbreviations } from "../data/Vocabolary";

const Home = () => {
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);

  return (
    <>
      <TopBar title='Home' />

      <ScrollItems>
        <div style={{ backgroundColor: primaryColor }}>
          <GridContainer>
            {abbreviations.map((item) => {
              return (
                <GridItems key={item.id} secondaryColor={secondaryColor}>
                  <Title>{item.name}</Title>
                  {item.types.map((type, index) => {
                    return (
                      <MeaningBox key={index} style={{ marginTop: "1rem" }}>
                        <small style={{ marginRight: "1rem" }}>{index + 1}</small>
                        <MeaningBox>
                          <ShortForm style={{ marginRight: "1rem" }}>
                            <small style={{ whiteSpace: "nowrap" }}>Short Form</small>
                            <Title>{type.shortForm}</Title>
                          </ShortForm>

                          {type.longForm ? (
                            <LongForm>
                              <small style={{ whiteSpace: "nowrap" }}>Meaning</small>
                              <Title>{type.longForm}</Title>
                            </LongForm>
                          ) : null}
                        </MeaningBox>
                      </MeaningBox>
                    );
                  })}
                </GridItems>
              );
            })}
          </GridContainer>
        </div>

        <div style={{ textAlign: "center" }}>
          <Logo>jVocab</Logo>
          <p>
            Developer{" "}
            <a
              href='https://barindebnath.github.io/portfolio'
              target='_blank'
              rel='noreferrer'
              style={{ color: primaryColor }}
            >
              B ∆ R I N
            </a>{" "}
            | Data collected from{" "}
            <a href='https://jlptstudy.net' target='_blank' rel='noreferrer' style={{ color: primaryColor }}>
              jlptstudy
            </a>
          </p>
        </div>
      </ScrollItems>
    </>
  );
};

export default Home;

const ScrollItems = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0.5rem 0 0 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${() =>
    document.documentElement.clientWidth > 768
      ? "repeat(auto-fit, minmax(20rem, 1fr))"
      : "repeat(auto-fit, minmax(15rem, 1fr))"};
  grid-gap: 1px;
`;

const GridItems = styled.div`
  padding: 1rem;
  background-color: ${({ secondaryColor }) => secondaryColor};
`;

const Title = styled.p`
  margin: 0;
  font-size: 1rem;
  font-family: BalooChettan2-SemiBold;
  text-transform: capitalize;
`;

const ShortForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const LongForm = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const MeaningBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const Logo = styled.p`
  border-radius: 50%;
  font-family: Brusher;
  font-size: 5rem;
`;
