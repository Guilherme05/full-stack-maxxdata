import React from 'react'
import 'materialize-css'
import { Footer } from 'react-materialize'

function FooterBar() {
    return (
        <Footer style={{width: '100%', position: 'fixed', bottom: 0}}
        copyrights="Develop Fullstack &copy 2021 Copyright Text"
        >
        </Footer>
    )
}

export default FooterBar