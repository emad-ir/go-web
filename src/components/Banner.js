import React, { Component } from 'react'
import Link from 'gatsby-link'

import GoLogo from '../../images/go_logo.png'
import arrow from '../../images/arrow_down.png'


class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <img src={GoLogo} alt="Go Logo" className="logo" />
                <img src={arrow} alt="Down arrow" className="arrow" onClick={() => this.props.onScroll()} />
            </div>
        )
    }
}

export default Banner
