import React from 'react'
import { LineChart, 
    Line,
    CartesianGrid,
    XAxis, 
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';

const GraphPage = ({data}) =>{
    return(
        <Container className="main-graph py-4">
            <Row>
                <Col>
                    <h2 className="fw-bold mb-4">Fuel Trends</h2>
                </Col>
            </Row>

            <Row>
                <Col md="4" className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <span className="d-block text-uppercase fw-bold text-black-50 small mb-3">Average E10 Price</span>

                            <ResponsiveContainer aspect={3}>
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="lastupdated" />
                                    <YAxis />
                                    <Tooltip/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <span className="d-block text-uppercase fw-bold text-black-50 small mb-3">Average 91 Price</span>

                            <ResponsiveContainer aspect={3}>
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="lastupdated" />
                                    <YAxis />
                                    <Tooltip/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <span className="d-block text-uppercase fw-bold text-black-50 small mb-3">Average 95 Price</span>

                            <ResponsiveContainer aspect={3}>
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="lastupdated" />
                                    <YAxis />
                                    <Tooltip/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <span className="d-block text-uppercase fw-bold text-black-50 small mb-3">Average 98 Price</span>

                            <ResponsiveContainer aspect={3}>
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="lastupdated" />
                                    <YAxis />
                                    <Tooltip/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4" className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <span className="d-block text-uppercase fw-bold text-black-50 small mb-3">Average Diesel Price</span>

                            <ResponsiveContainer aspect={3}>
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="lastupdated" />
                                    <YAxis />
                                    <Tooltip/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}

export default GraphPage