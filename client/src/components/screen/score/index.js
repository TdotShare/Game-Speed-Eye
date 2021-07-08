import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'


function Index() {

    const [userList, setUserList] = React.useState([
        { rank: 1, name: "test01", score: 10 },
        { rank: 2, name: "test02", score: 12 },
        { rank: 3, name: "test03", score: 16 },
        { rank: 4, name: "test04", score: 17 },
        { rank: 5, name: "test05", score: 18 },
        { rank: 6, name: "test06", score: 20 },
    ])

    const actionGetScore = () => {
        console.log("actionGetScore !")
    }

    React.useEffect(() => {
        actionGetScore()
    }, [])

    const scoreList = userList.map((el, index) => (
        <div key={index} style={{ padding: '1%' }}>
            <Card 
            className={`shadow-sm rounded`}
            bg={index === 0 ? "secondary" : "light" } 
            key={index} 
            text={index === 0 ?  'white' : 'dark' }
            >
                <Card.Body>
                    <Row>
                        <Col>{el.rank}</Col>
                        <Col>{el.name}</Col>
                        <Col>{el.score}</Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    ))

    return (
        <Container fluid style={{ textAlign: "center", paddingTop: `10%` }}>
            <center><h3>คะแนนสูงสุด</h3></center>

            <Row style={{ paddingBottom: '1%', paddingTop: "2%" }}>
                <Col>
                    <Link to="/">
                        <Button variant="warning" block><FontAwesomeIcon icon={faUndo} /> กลับไปเล่นเกม</Button>
                    </Link>
                </Col>
            </Row>

            <hr />

            <Card style={{ padding: '1%' }} >
                <Card.Body>
                    <Row>
                        <Col>อันดับ</Col>
                        <Col>ชื่อผู้เล่น</Col>
                        <Col>คะแนน</Col>
                    </Row>
                </Card.Body>
            </Card>

            {scoreList}
            
            <hr/>

            <h4>จากทั้งหมด 100 คน</h4>

        </Container>
    )
}


export default connect(null, null)(Index)
