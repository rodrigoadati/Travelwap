import React from 'react';
import FlightsRouter from './FlightsRouter';
import FlightsHeader from './FlightsHeader';

const styles = {
    flights: {
        background: '#ffffff'
    }
}

const Flights = () => {
    return (
        <div style={styles.flights}>
            <FlightsHeader />
            <FlightsRouter />
        </div>
    )
}
export default Flights;