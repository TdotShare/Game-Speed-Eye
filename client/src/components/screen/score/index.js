import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'

import { API } from "./../../../config/api"


function Index() {


    const [userList, setUserList] = React.useState([])
    const [userCounts, setUserCounts] = React.useState(0)

    const actionGetScore = () => {

        fetch(`${API}/api/accounts/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(res => {
                setUserList(res.data ? res.data : [])
                setUserCounts(res.count)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    React.useEffect(() => {
        actionGetScore()
    }, [])

    const scoreList = userList.map((el, index) => (
        <div key={index} style={{ padding: '1%' }}>
            <Card
                className={`shadow-sm rounded`}
                bg={index === 0 ? "secondary" : "light"}
                key={index}
                text={index === 0 ? 'white' : 'dark'}
            >
                <Card.Body>
                    <Row>
                        <Col>{index + 1}</Col>
                        <Col>{el.userName}</Col>
                        <Col>{el.userScore}</Col>
                        <Col>{el.userCreateAt}</Col>
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
                        <Col>เวลาที่บันทึก</Col>
                    </Row>
                </Card.Body>
            </Card>

            {scoreList}

            <hr />

            <h4>จากทั้งหมด {userCounts} คน</h4>

            <div style={{paddingTop : "2%"}}></div>

        </Container>
    )
}


export default connect(null, null)(Index)
