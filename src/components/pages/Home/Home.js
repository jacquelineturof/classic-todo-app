import React from 'react'

import Header from '../../UI/Header/Header'
import ImageGrid from '../../UI/ImageGrid/ImageGrid'

import classes from './Home.module.css'

const Home = () => (
    <section className = { classes.Home }>
        <Header type = "home" />
        <ImageGrid />
    </section>
)

export default Home