const Links = () => {
  const links = [
    { name: "github", url: "https://github.com/aamir-067" },
    { name: "linkedIn", url: "https://www.linkedin.com/in/i-aamir-khan" },
    { name: "what'sApp", url: "https://wa.me/923441259408" },
    { name: "instagram", url: "https://www.instagram.com/iaamir067" },
    {
      name: "download resume",
      url: "https://drive.google.com/file/d/1v_eu1UWxvONh5yU8bqRLkmZDs-baNs6Z/view?usp=sharing",
    },
  ];

  return (
    <div className="flex items-center flex-wrap gap-x-8 gap-y-4 pb-10">
      <a
        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 rounded-xl font-victor text-white dark:bg-white dark:text-slate-950"
        href="https://calendly.com/aamirdev/1-in-1-meeting"
        rel="noreferrer"
        target="_blank"
      >
        Book a Meeting
      </a>
      {links.map((link) => (
        <a
          key={link.url}
          download={link.name === "download resume"}
          target="_blank"
          rel="noreferrer"
          href={link.url}
          className="underline font-victor capitalize text-violet-500 visited:text-violet-500 dark:text-violet-400 dark:visited:text-violet-400"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default Links;

