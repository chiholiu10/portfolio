import { InnerComponent } from "./InnerComponent";
import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";

export default function Components() {
  return (
    <ThemeProvider theme={theme}>
      <CSSreset theme={theme} />
      <InnerComponent />
    </ThemeProvider>
  );
}
