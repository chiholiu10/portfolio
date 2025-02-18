import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";
import { dynamicImport } from "../utils/dynamicImport";

// Dynamically import components using the utility function
const DynamicNavbar = dynamicImport("Sections/Navbar/Navbar", "Navbar");
const DynamicBanner = dynamicImport("Sections/Banner/Banner", "Banner");
const DynamicIntroduction = dynamicImport(
  "Sections/Introduction/Introduction",
  "Introduction",
);
const DynamicExperience = dynamicImport(
  "Sections/Experience/Experience",
  "Experience",
);
const DynamicPortfolio = dynamicImport(
  "Sections/Portfolio/Portfolio",
  "Portfolio",
);
const DynamicTools = dynamicImport("Sections/Tools/Tools", "Tools");
const DynamicContact = dynamicImport("Sections/Contact/Contact", "Contact");
const DynamicFooter = dynamicImport("Sections/Footer/Footer", "Footer");

export default function ClientSide() {
  return (
    <ThemeProvider theme={theme}>
      <CSSreset theme={theme} />
      <DynamicNavbar />
      <DynamicBanner />
      <DynamicIntroduction />
      <DynamicExperience />
      <DynamicPortfolio />
      <DynamicTools />
      <DynamicContact />
      <DynamicFooter />
    </ThemeProvider>
  );
}
