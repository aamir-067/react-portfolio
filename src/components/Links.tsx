const Links = () => {
    const links = [
        {
            name: "github",
            url: "https://github.com/aamir-067"
        },
        {
            name: "linkedIn",
            url: "https://www.linkedin.com/in/i-aamir-khan"
        },
        {
            name: "what'sApp",
            url: "https://wa.me/923441259408"
        },
        {
            name: "instagram",
            url: "https://www.instagram.com/aamir.067"
        },
        {
            name: "don't click",
            url: "https://drive.google.com/file/d/1v_eu1UWxvONh5yU8bqRLkmZDs-baNs6Z/view?usp=sharing"
        }
    ]
    return (
        <div className='flex flex-wrap gap-x-8 gap-y-4 pb-10'>
            {
                links.map(link => (
                    <a key={link.url} download={link.name === "don't click"} target={"_blank"} href={link.url} rel="noreferrer" className='p-0 underline font-victor capitalize text-blue-400 visited:text-violet-400'>{link.name}</a>
                ))
            }
        </div>
    )
}

export default Links
