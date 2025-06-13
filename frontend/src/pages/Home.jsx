import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Bienvenido a SenaBot</Card.Title>
              <Card.Text>
                Administra y consulta los beneficios disponibles para adultos mayores.
              </Card.Text>
              <Link to="/beneficios">
                <Button variant="primary" className="m-2">Ver Beneficios</Button>
              </Link>
              <Link to="/beneficios/crear">
                <Button variant="success" className="m-2">Agregar Beneficio</Button>
              </Link>
              <Link to="/beneficios/vigentes">
                <Button variant="info" className="m-2">Beneficios Vigentes</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
