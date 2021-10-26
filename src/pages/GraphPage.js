import React from 'react'
import { LineChart, 
    Line,
    CartesianGrid,
    XAxis, 
    YAxis,
    Tooltip  
} from 'recharts';

import {
    Container
} from 'react-bootstrap';

const GraphPage = ({data}) =>{
    return(
        <Container className="main-graph">
            <LineChart width={1200} height={600} data={data}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="lastupdated" />
                <YAxis />
                <Tooltip/>
            </LineChart>
        </Container>
    )

}

export default GraphPage