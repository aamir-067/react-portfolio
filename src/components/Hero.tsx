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
                    alt="profile image of Muhammad Aamir Khan, a software engineering student. Instead of just relying on my CS degree, I focus on learning practical skills. So far, I've picked up blockchain development, full-stack web development, and mobile app development with Expo React Native."
                    className={`w-full lazy-image  h-full rounded-xl p-0.5 object-cover overflow-hidden ${loaded ? "loaded" : "loading"}`}
                    src={
                        isDark ? "./profile_dark.jpg" : "./profile_light.jpg"
                    }

                    onLoad={() => setLoaded(true)}
                    onLoadStart={() => setLoaded(false)}
                />
            </div>

            <div className='w-full h-3/5 flex items-center'>
                <div className='text-black dark:text-gray-300'>
                    <h2 className='text-3xl md:text-4xl mt-4 font-bolder font-victor capitalize'>M. Aamir Khan</h2>
                    <p className='text-sm leading-6 font-victor my-5'>
                        Hi, I'm Muhammad Aamir Khan, a software engineering student. Instead of just relying on my CS degree, I focus on learning practical skills. So far, I've picked up blockchain development, full-stack web development, and mobile app development with Expo React Native.<br /> <br />

                        I bet you're curious about my work experience! Right now, I'm interning as a full-stack web developer at Devsort Services. Some of the projects I've worked on include Aamfeer Kitchen, Morph AI, and a Staking and Token Pre-sale DApp. But those aren’t the only projects—if you want to know more about me, feel free to check out my LinkedIn. And if you’re really interested in seeing my code (it’s a bit messy!), head over to my GitHub. <br /> <br />

                        If you’d like to reach out or hire me, just drop me a message on WhatsApp or Instagram!
                    </p>
                </div>
            </div>

            <Links />
        </div>
    )
}

export default Hero