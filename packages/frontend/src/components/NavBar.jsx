import React from 'react'
import {navLinks} from '../constants/links.js'

export const NavBar = () => {
    console.log(navLinks);
    return (
        <div>
            {navLinks.map((link, index) => {
                return (
                    <a key={index} href={link.path}>{link.name}</a>
                )
            })}
        </div>
    )
}