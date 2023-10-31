import styled from "styled-components";

const LabelColor = (props) => (props.$completed ? "#b0b0b0" : "#000");
const TextDecoration = (props) => (props.$completed ? "line-through" : "none");
const BgColor = (props) => (props.$completed ? "#56b8ff" : "#fafafa");
const Size = (props) => (props.$completed ? "20px" : " 14px");

const Label = styled.label`
  color: ${LabelColor};
  text-decoration: ${TextDecoration};
  &::before {
    border: 3px solid #cacece;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    display: inline-block;
    background-color: ${BgColor};
    width: ${Size};
    height: ${Size};
  }
`;

export { Label };
