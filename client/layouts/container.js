import React from 'react';
import PropTypes from 'prop-types';

import BulmaContainer from 'react-bulma-components/src/components/container';

const Container = ({ children }) => (
    <BulmaContainer
        fluid
        style={{
            flex: 'auto',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            height: '-webkit-fill-available',
            padding: '1rem'
        }}>

        {children}

    </BulmaContainer>
);

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Container;