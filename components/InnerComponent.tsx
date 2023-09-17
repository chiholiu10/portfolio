import {
  Navbar,
  Banner,
  Introduction,
  Experience,
  Tools,
  Contact,
  Portfolio,
  Footer,
} from "./Sections";

export const InnerComponent = () => {
  const generalClassName = "triggerAnimation";

  return (
    <>
    <Navbar/>
    <Banner />
    <Introduction />
    <Experience />
    <Portfolio />
    <Tools />
    <Contact />
    <Footer />
  </>
  )
};
