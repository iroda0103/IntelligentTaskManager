import styled from "styled-components";

const SpanColor = (props) => (props.$completed ? "#b0b0b0" : "#000");
const TextDecoration = (props) => (props.$completed ? "line-through" : "none");

const Span = styled.p`
  color: ${SpanColor};
  text-decoration: ${TextDecoration};
`;

export { Span };
