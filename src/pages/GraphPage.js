import React, { useState} from 'react'
import {
  Row,
  Container,
  Col,
  Dropdown,
} from 'react-bootstrap'



import FuelGraph from '../components/FuelGraph'
const GraphPage = () =>{

  const E10Data = [
    {
      fuelType: 'E10',
      price: 160.07,
      date: '01/11/2021'
    },
    {
      fuelType: 'E10',
      price: 160.12,
      date: '02/11/2021'
    },
    {
      fuelType: 'E10',
      price: 167.44,
      date: '03/11/2021'
    },
    {
      fuelType: 'E10',
      price: 163.12,
      date: '04/11/2021'
    },
    {
      fuelType: 'E10',
      price: 157.65,
      date: '05/11/2021'
    },
    {
      fuelType: 'E10',
      price: 161.23,
      date: '06/11/2021'
    },
    {
      fuelType: 'E10',
      price: 156.12,
      date: '07/11/2021'
    }
  ]
  
  const U91Data = [
    {
      fuelType: 'U91',
      price: 180.07,
      date: '01/11/2021'
    },
    {
      fuelType: 'U91',
      price: 183.12,
      date: '02/11/2021'
    },
    {
      fuelType: 'U91',
      price: 187.44,
      date: '03/11/2021'
    },
    {
      fuelType: 'U91',
      price: 191.12,
      date: '04/11/2021'
    },
    {
      fuelType: 'U91',
      price: 183.65,
      date: '05/11/2021'
    },
    {
      fuelType: 'U91',
      price: 179.23,
      date: '06/11/2021'
    },
    {
      fuelType: 'U91',
      price: 175.12,
      date: '07/11/2021'
    }
  ]
  
  const P95Data = [
    {
      fuelType: 'P95',
      price: 130.23,
      date: '01/11/2021'
    },
    {
      fuelType: 'P95',
      price: 133.12,
      date: '02/11/2021'
    },
    {
      fuelType: 'P95',
      price: 147.44,
      date: '03/11/2021'
    },
    {
      fuelType: 'P95',
      price: 141.12,
      date: '04/11/2021'
    },
    {
      fuelType: 'P95',
      price: 138.65,
      date: '05/11/2021'
    },
    {
      fuelType: 'P95',
      price: 139.23,
      date: '06/11/2021'
    },
    {
      fuelType: 'P95',
      price: 130.12,
      date: '07/11/2021'
    }
  ]

  const P98Data = [
    {
      fuelType: 'P98',
      price: '200.12',
      date: '01/11/2021'
    },
    {
      fuelType: 'P98',
      price: 203.12,
      date: '02/11/2021'
    },
    {
      fuelType: 'P98',
      price: 207.44,
      date: '03/11/2021'
    },
    {
      fuelType: 'P98',
      price: 201.12,
      date: '04/11/2021'
    },
    {
      fuelType: 'P98',
      price: 203.65,
      date: '05/11/2021'
    },
    {
      fuelType: 'P98',
      price: 209.23,
      date: '06/11/2021'
    },
    {
      fuelType: 'P98',
      price: 205.12,
      date: '07/11/2021'
    }
  ]
  const DLData = [
    {
      fuelType: 'DL',
      price: 120.07,
      date: '01/11/2021'
    },
    {
      fuelType: 'DL',
      price: 123.12,
      date: '02/11/2021'
    },
    {
      fuelType: 'DL',
      price: 127.44,
      date: '03/11/2021'
    },
    {
      fuelType: 'DL',
      price: 121.12,
      date: '04/11/2021'
    },
    {
      fuelType: 'DL',
      price: 123.65,
      date: '05/11/2021'
    },
    {
      fuelType: 'DL',
      price: 129.23,
      date: '06/11/2021'
    },
    {
      fuelType: 'DL',
      price: 135.12,
      date: '07/11/2021'
    }
  ]
  
  const [fuelName, setFuelName] = useState('E10')
  const [fuelData, setFuelData] = useState(E10Data)

  const handleChangeGraph = (fuel, name) =>{
    setFuelName(name)
    setFuelData(fuel)

  }

  return(	  
    <Container className="main-graph py-4">
      <Row>
        <Col>
          <h2 className="fw-bold mb-4">Fuel Trends</h2>
        </Col>
      </Row>
      <div>
        <Row>
	      <Col>
            <div className="d-flex justify-content-between align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="text" id="fuelSelect">
                  <b>Fuel:</b> {fuelName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>handleChangeGraph(E10Data,'E10')}>E10</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleChangeGraph(U91Data,'91')}>91</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleChangeGraph(P95Data,'95')}>95</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleChangeGraph(P98Data,'98')}>98</Dropdown.Item>
                  <Dropdown.Item onClick={()=>handleChangeGraph(DLData,'Diesel')}>Diesel</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
	    </Row>
      </div>
      <div>
        <Row>       
		  <FuelGraph data={fuelData} fuelName={fuelName} />  
        </Row>
	  </div>
    </Container>
  )

}

export default GraphPage