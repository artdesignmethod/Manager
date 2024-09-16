import { Logo, Features, Hero, Footer } from "../components";

const Landing = () => {
  return (
    <div>
      <header className="header">
        <nav className="main-nav">
          <Logo />
        </nav>

        <Hero />
      </header>

      <Features />

      <Footer />
    </div>
  );
};
export default Landing;
