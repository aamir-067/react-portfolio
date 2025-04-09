import { useState } from "react";
import NavBar from "./Navbar";
import Links from "./Links";

const Hero = () => {
  const [isDark, setIsDark] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="min-w-screen px-10 md:px-40 lg:px-60 min-h-screen bg-white dark:bg-slate-950">
      <NavBar isDark={isDark} setIsDark={setIsDark} />
      <section aria-label="Profile Section">
        <div className="w-full max-w-[200px] bg-black dark:bg-slate-300 rounded-xl h-[200px]">
          <img
            alt="Profile image of Muhammad Aamir Khan, Full Stack Web & Mobile Developer skilled in blockchain, MERN stack, AI integration, webOS LG, Samsung TV Tizen development, AWS, and Supabase."
            className={`w-full h-full rounded-xl p-0.5 object-cover overflow-hidden ${loaded ? "loaded" : "loading"}`}
            src={isDark ? "./profile_dark.webp" : "./profile_white.webp"}
            onLoad={() => setLoaded(true)}
            onLoadStart={() => setLoaded(false)}
          />
        </div>
        <div className="w-full h-3/5 flex items-center">
          <div className="text-black dark:text-gray-300">
            <h1 className="text-3xl md:text-4xl mt-4 font-bold font-victor capitalize">
              Muhammad Aamir Khan
            </h1>
            <p className="text-sm leading-6 font-victor my-5">
              Hi, I'm Aamir, a Full Stack Web & Mobile Developer passionate
              about creating scalable, innovative solutions. I specialize in
              blockchain, full‑stack development using the MERN stack, AI
              integration, webOS LG development, Samsung TV Tizen development,
              AWS, Supabase, and more.
              <br />
              <br />
              Currently, I work at Mestasense Technologies, and I have hands-on
              experience in developing interactive web and mobile applications,
              deploying production‑grade systems, and contributing to
              industry‐leading projects.
              <br />
              <br />
              Feel free to check out my projects, connect on LinkedIn, or view
              my GitHub profile for more details.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <Links />
      </footer>
    </main>
  );
};

export default Hero;
