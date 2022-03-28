import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import styled from "@emotion/styled";
import Jazzicon from "react-jazzicon";
import numberForAddress from "../utils/numberForAddress";

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
  margin: 0 0 0 0.5rem;
`;

export default function Identicon() {
  const { account } = useEthers();

  return (
    <StyledIdenticon>
      {account && <Jazzicon diameter={16} seed={numberForAddress(account)} />}
    </StyledIdenticon>
  );
}
