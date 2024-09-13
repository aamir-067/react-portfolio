import React from 'react'

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
            url: "https://www.instagram.com/iaamir067"
        },
        {
            name: "don't click",
            url: "https://farvelo.com"
        }
    ]
    return (
        <div className='flex flex-wrap gap-x-8 gap-y-4'>
            {
                links.map(link => (

                    <a key={link.url} target={"_blank"} href={link.url} className='p-0 underline font-victor capitalize text-blue-400 visited:text-violet-400'>{link.name}</a>
                ))
            }
        </div>
    )
}

export default Links