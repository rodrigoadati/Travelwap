import React from 'react';
import CarsHeader from './CarsHeader';
import CarsrRouter from './CarsRouter';

const styles = {
    cars: {
        background: '#ffffff'
    }
}

const Cars = () => {
    return (
        <div style={styles.cars}>
            <CarsHeader />
            <CarsrRouter />
        </div>
    )
}
export default Cars;