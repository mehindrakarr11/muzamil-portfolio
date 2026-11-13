import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Expertise } from "@/components/expertise";
import { Journey } from "@/components/journey";
import { Contact } from "@/components/contact";

export default function Home() {
  return <>
    <Header />
    <main id="main">
      <Hero />
      <About />
      <Work />
      <Expertise />
      <Journey />
      <Contact />
    </main>
  </>;
}
