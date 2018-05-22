import React from 'react';
import HotelsHeader from './HotelsHeader';
import HotelsRouter from './HotelsRouter';

const styles = {
    hotels: {
        background: '#ffffff'
    }
}

const Hotels = () => {
    return (
        <div style={styles.hotels}>
            <HotelsHeader />
            <HotelsRouter />
        </div>
    )
}
export default Hotels;