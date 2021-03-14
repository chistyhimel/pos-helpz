import React from 'react';
import DataInput from '../DataInput/DataInput';

import ProductViewTable from '../ProductViewTable/ProductViewTable';
import './Home.css'
const Home = () => {
    return (
        <div className="homeBody">
            
            <DataInput/>
            <ProductViewTable/>
            


        </div>
    );
};

export default Home;