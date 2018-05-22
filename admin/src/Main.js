import React from 'react';
import HeaderNav from './HeaderNav';
import MainRouter from './MainRouter';

const styles = {
    main: {
      padding: '20px 200px',
    },

    headerNav: {
        background: '#000000'
    }
  
  };

const Main = () => {
    return (
        <div style={styles.main} >
            <HeaderNav style={styles.headerNav}/>
            <MainRouter style={styles.main} />
        </div>
    )
}

export default Main;