import dynamic from "next/dynamic";
import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";

const DynamicNavbar = dynamic(() =>
  import("../components/Sections/Navbar/Navbar").then((mod) => mod.Navbar));
const DynamicBanner = dynamic(() =>
  import("../components/Sections/Banner/Banner").then((mod) => mod.Banner));
const DynamicIntroduction = dynamic(() =>
  import("../components/Sections/Introduction/Introduction").then(
    (mod) => mod.Introduction,
  ));
const DynamicExperience = dynamic(() =>
  import("../components/Sections/Experience/Experience").then(
    (mod) => mod.Experience,
  ));
const DynamicPortfolio = dynamic(() =>
  import("../components/Sections/Portfolio/Portfolio").then(
    (mod) => mod.Portfolio,
  ));
const DynamicContact = dynamic(() =>
  import("../components/Contact/Contact").then((mod) => mod.Contact));
const DynamicTools = dynamic(() =>
  import("../components/Sections/Tools/Tools").then((mod) => mod.Tools));
const DynamicFooter = dynamic(() =>
  import("../components/Sections/Footer/Footer").then((mod) => mod.Footer));

export default function ClientSide() {
  return (
    <>
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
    </>
  );
}
