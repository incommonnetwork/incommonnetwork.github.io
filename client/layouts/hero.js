/* global document */
import React from 'react';
import PropTypes from 'prop-types';

import BulmaHero from 'react-bulma-components/src/components/hero';
import Container from 'react-bulma-components/src/components/container';
import Tile from 'react-bulma-components/src/components/tile';
import Button from 'react-bulma-components/src/components/button';

import Title from '../components/title';
import Header from '../components/header';

const Hero = ({ title, subtitle, children, image, lede, textColor }) => (
    <BulmaHero size="fullheight" style={{
        backgroundImage: `url(${process.env.ASSET_PREFIX}${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }}>
        <Header />
        <Tile vertical style={{ justifyContent: 'space-around' }}>
            <BulmaHero style={{ backgroundColor: 'rgba(0, 0, 0, 0.69)', padding: '2rem' }}>
                <Title size={1} title={title} subtitle={subtitle} color={textColor} />
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <p style={{ maxWidth: '20rem', color: 'white' }}>
                        {lede}
                    </p>
                </div>
                <Container fluid>
                    <Tile kind="parent">
                        {children}
                    </Tile>
                </Container>
            </BulmaHero>
        </Tile>
    </BulmaHero >
);

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.string,
    textColor: PropTypes.string,
    lede: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const HeroTile = ({ title, subtitle, sidekick, textColor = 'white' }) => (
    <Tile kind="child" renderAs="article" style={{
        margin: '6rem',
        padding: '.5rem'
    }} >
        <Title size={3} title={title} subtitle={subtitle} color={textColor} />
        <br />
        <div style={{ textAlign: 'center' }}>
            <Button
                style={{
                    margin: '1rem',
                    backgroundColor: '#fffefeb0',
                    borderWidth: '2px'
                }}
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    document.getElementById(sidekick).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }}>Learn More</Button>
        </div>
    </Tile >
);

HeroTile.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    sidekick: PropTypes.string.isRequired,
    textColor: PropTypes.string
};



const SideKickImage = ({ src }) => (
    <Tile style={{
        backgroundImage: `url(${process.env.ASSET_PREFIX}${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }} />
);

SideKickImage.propTypes = {
    src: PropTypes.string.isRequired
};

const SideKick = ({ title, children, image, justify = 'left', name, backgroundColor = 'white' }) => (
    <BulmaHero size="fullheight" style={{ backgroundColor, maxHeight: '100vh' }}>
        <a id={name} />
        <BulmaHero style={{ paddingBottom: '2rem' }}>
            <Title size={1} title={title} />
        </BulmaHero>
        <Tile >
            {justify !== 'left' ? <SideKickImage src={image} /> : null}
            <Tile>
                {children || 'CONTENT'}
            </Tile>
            {justify === 'left' ? <SideKickImage src={image} /> : null}
        </Tile>
    </BulmaHero>
);

SideKick.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    justify: PropTypes.string,
    backgroundColor: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { SideKick, HeroTile };

export default Hero;