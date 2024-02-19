import React from 'react'
import { LINKS_FOOTER } from '../utils/LinksFooter'
import IconsFooter from './IconsFooter'

function Footer() {
    return (
    <footer className='w-full pt-10'>
        <div className='flex flex-wrap justify-center gap-3 w-full min-h-24 bg-black py-3 px-8 min-[806px]:justify-between min-[600px]:px-24'>
            <div>
                <p className='text-white font-semibold text-center'> © 2024 MindHub Bank S.A. - All rigths reserved.</p>
            </div>
            <div className='flex gap-3'>
                {LINKS_FOOTER.map((icon) =>{
                            return (
                                <IconsFooter key={icon.src} src={icon.src} alt={icon.alt}></IconsFooter> 
                            )
                        })
                }
            </div>
        </div>
    </footer>

    )
}

export default Footer