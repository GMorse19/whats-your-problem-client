import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Home.scss'

const Home = () => {
  return (
    <div>
      <Container className="home-container">
        <Row className="box">
          <Col className="box">
            <img
              style={{ justifyContent: 'center' }}
              className="box"
              src="WYP.png"
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Home
