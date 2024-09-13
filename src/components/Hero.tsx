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
                <img className={`w-full lazy-image  h-full rounded-xl p-0.5 object-cover overflow-hidden ${loaded ? "loaded" : "loading"}`}
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
                    <p className='text-sm leading-6 font-victor my-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam eius suscipit explicabo nostrum tempora minus, aliquid quam porro repudiandae odio illum, quisquam iure at alias quae blanditiis voluptatum labore obcaecati.</p>
                </div>
            </div>

            <Links />
        </div>
    )
}

export default Hero