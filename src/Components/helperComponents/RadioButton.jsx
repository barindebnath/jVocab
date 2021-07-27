import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const RadioButton = ({ value, disabled, selectedValue, setValue }) => {
  const primaryColor = useSelector((state) => state.theme.primary);
  const secondaryColor = useSelector((state) => state.theme.secondary);
  const hoverColor = useSelector((state) => state.theme.hover);
  const dispatch = useDispatch();

  return (
    <RadioInput
      active={selectedValue === value}
      disabled={disabled}
      // htmlFor={value}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      hoverColor={hoverColor}
    >
      <input
        type='radio'
        id={value}
        value={value}
        checked={selectedValue === value}
        onChange={(e) => dispatch(setValue(e.target.value))}
        disabled={disabled}
        style={{ display: "none" }}
      />
      {value}
    </RadioInput>
  );
};

export default RadioButton;

const RadioInput = styled.label`
  background-color: ${({ active, primaryColor }) => (active ? primaryColor : false)};
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  color: ${({ active, secondaryColor }) => (active ? secondaryColor : false)};
  cursor: ${({ disabled }) => (disabled ? false : "pointer")};
  text-transform: capitalize;
  color: ${({ disabled }) => (disabled ? "#d1d5db" : false)};
  font-family: BalooChettan2-SemiBold;
  &:hover {
    background-color: ${({ active, disabled, primaryColor, hoverColor }) =>
      disabled ? false : active ? primaryColor : hoverColor};
  }
  &:active {
    background-color: ${({ disabled, primaryColor }) => (disabled ? false : primaryColor)};
    color: ${({ disabled, secondaryColor }) => (disabled ? false : secondaryColor)};
  }
`;
