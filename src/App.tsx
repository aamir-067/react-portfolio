import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';

function App() {
  const seoTitle = "Muhammad Aamir Khan – Full Stack Web & Mobile Developer";
  const seoDescription = "Muhammad Aamir Khan is a Full Stack Web & Mobile Developer based in Bannu, Pakistan. Specializing in blockchain, MERN stack, AI integration, webOS LG development, Samsung TV Tizen development, AWS, Supabase, and modern web/mobile applications. Passionate about creating scalable and innovative solutions.";
  const keywords = "full stack developer, mobile developer, blockchain development, MERN stack, React, React Native, Next.js, Node.js, JavaScript, TypeScript, AI integration, OpenAI integration, Gemini integration, webOS LG development, Samsung TV Tizen development, AWS, Supabase, Docker, Firebase, Prisma, PostgreSQL, MongoDB, MySQL, smart contracts, responsive design, progressive web apps, UI/UX design, DevOps, scalable solutions, agile methodologies";
  const canonicalUrl1 = "https://portfolio-of-aamir.vercel.app";
  const canonicalUrl2 = "https://portfolio-of-aamir.netlify.app";
  const profileImage = "https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_zc421a63326d42ac782ac051b_f11475e19290637c4_d20250409_m055800_c005_v0501028_t0015_u01744178280365";
  const twitterUsername = "@A_a_M_i_R_";
  const author = "muhammad Aamir khan";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author,
    "jobTitle": "Full Stack Web & Mobile Developer",
    "url": canonicalUrl1,
    "image": profileImage,
    "description": seoDescription,
    "knowsAbout": [
      "Blockchain Development",
      "MERN Stack",
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "AI Integration",
      "OpenAi",
      "Gemini Integration",
      "webOS LG development",
      "Samsung TV Tizen development",
      "AWS",
      "Supabase",
      "Docker",
      "Firebase",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "MySQL"
    ],
    "affiliation": {
      "@type": "Organization",
      "name": "Mestasense Technologies"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "UST Bannu"
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        {/* Canonical and Alternate Links */}
        <link rel="canonical" href={canonicalUrl1} />
        <link rel="alternate" href={canonicalUrl2} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl1} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={profileImage} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={profileImage} />
        <meta name="twitter:site" content={twitterUsername} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>
      <div className="App">
        <Hero />
      </div>
    </>
  );
}

export default App;

