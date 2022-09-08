import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 800px) {
      ${props}
    }
  `;
};

export const screen = (props) => {
  return css`
    @media only screen and (max-width: 1050px) {
      ${props}
    }
  `;
};

export const micro = (props) => {
  return css`
    @media only screen and (max-width: 360px) {
      ${props}
    }
  `;
};