import styled from "styled-components";

interface Props {
  isError?: boolean;
}
export const Input = styled.input<Props>`
  font-size: 18px;
  padding: 0.8rem;
  border-radius: 5px;
  background: #333;
  opacity: 0.9;
  color: #ececec;
  border: ${(props) => (props.isError ? "1px solid red" : "none")};
  margin-bottom: 5px;

  &::placeholder {
    color: #888;
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;

export const Small = styled.small`
  font-size: medium;
  color: red;
  font-size: 0.75rem;
  margin-bottom: 10px;
`;
