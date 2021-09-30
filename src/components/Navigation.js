import {
    Navbar,
    Container,
} from 'react-bootstrap'

const Navigation = ({ }) => {
    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#home">Fuel Checker</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation