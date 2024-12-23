import { useState } from "react"
import NavBar from "./Navbar"
import Links from "./Links";
const Hero = () => {
    const [isDark, setIsDark] = useState(false);
    const [loaded, setLoaded] = useState(false);
    return (
        <div className='min-w-screen px-10 md:px-40 lg:px-60  min-h-screen bg-white dark:bg-slate-950'>
            <NavBar isDark={isDark} setIsDark={setIsDark} />

            <div className="w-full max-w-[200px] bg-black dark:bg-slate-300 rounded-xl h-[200px]">
                <img
                    alt="profile of Muhammad Aamir Khan, a software engineering student. Instead of just relying on my CS degree, I focus on learning practical skills. So far, I've picked up blockchain development, full-stack web development, and mobile app development with Expo React Native."
                    className={`w-full  h-full rounded-xl p-0.5 object-cover overflow-hidden ${loaded ? "loaded" : "loading"}`}
                    src={
                        isDark ? "./profile_dark.webp" :
                            "./profile_white.webp"
                    }

                    onLoad={() => setLoaded(true)}
                    onLoadStart={() => setLoaded(false)}
                />
            </div>

            <div className='w-full h-3/5 flex items-center'>
                <div className='text-black dark:text-gray-300'>
                    <h2 className='text-3xl md:text-4xl mt-4 font-bolder font-victor capitalize'>M. Aamir Khan</h2>
                    <p className='text-sm leading-6 font-victor my-5'>
                        Hi, I'm Aamir, a software engineering student. Instead of just relying on my degree, I focused on learning practical skills. I've picked up blockchain, web, and mobile app development with React Native.<br /> <br />
                        I bet you're curious about my work experience! I work as a full-stack web developer at Metasense Technologies. Some of my personal projects I've worked on include&nbsp;
                        <a target={"_blank"} href={"https://play.google.com/store/apps/details?id=com.aamir067.morphai"} rel="noreferrer" className='p-0 underline font-victor capitalize text-black dark:text-gray-300 visited:text-black visited:dark:text-gray-300'>Morph AI</a>,&nbsp;
                        <a target={"_blank"} href={"https://racipe-project-front.vercel.app/"} rel="noreferrer" className='p-0 underline font-victor capitalize text-black dark:text-gray-300 visited:text-black visited:dark:text-gray-300'>Aamfeer Kitchen</a>,&nbsp;
                        <a target={"_blank"} href={"https://tixbuddy.netlify.app/"} rel="noreferrer" className='p-0 underline font-victor capitalize text-black dark:text-gray-300 visited:text-black visited:dark:text-gray-300'>TixBuddy</a>&nbsp;and a&nbsp;
                        <a target={"_blank"} href={"https://liquidtron.netlify.app/"} rel="noreferrer" className='p-0 underline font-victor capitalize text-black dark:text-gray-300 visited:text-black visited:dark:text-gray-300'>Token Pre-sale DApp</a>. But those aren’t the only projects—if you want to know more about me, feel free to check out my LinkedIn. And if you’re really interested in seeing my code (it’s a bit messy!), head over to my GitHub. <br /> <br />

                        If you’d like to reach out or hire me, just drop me a message on WhatsApp or Instagram!
                    </p>
                </div>
            </div>

            <Links />
        </div>
    )
}

export default Hero
