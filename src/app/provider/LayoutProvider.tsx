'use client';

import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "../lib/registry";
import { theme } from "../style/theme";


export default function LayoutProvider({children}:{children:React.ReactNode}){
    return (
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
    )
}
