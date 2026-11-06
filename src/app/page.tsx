import { Hero } from '@/components/sections/Hero/Hero';
import { Statement } from '@/components/sections/Statement/Statement';
import { SelectedWorks } from '@/components/sections/SelectedWorks/SelectedWorks';
import { Capabilities } from '@/components/sections/Capabilities/Capabilities';
import { Experience } from '@/components/sections/Experience/Experience';
import { About } from '@/components/sections/About/About';
import { Contact } from '@/components/sections/Contact/Contact';

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Statement />
        <SelectedWorks />
        <Capabilities />
        <Experience />
        <About />
      </main>
      <Contact />
    </>
  );
}
