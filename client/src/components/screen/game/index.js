import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ProgressBar, Button, Modal, Form } from 'react-bootstrap';
import TableGame from './table'
import AnimatedNumber from "animated-number-react";
import swal from 'sweetalert';

import { Link } from "react-router-dom";
import { API } from "./../../../config/api"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faListOl, faPlay } from '@fortawesome/free-solid-svg-icons'

import { connect, useSelector } from 'react-redux'

function Index(props) {


    const [time_max] = useState(5)
    const [userName, setUserName] = useState("")
    const scoreGame = useSelector(state => state.playgame.scoreGame)
    const numberKey = useSelector(state => state.playgame.numberKey)
    const stopGame = useSelector(state => state.playgame.stopGame)
    const timerGame = useSelector(state => state.playgame.timerGame)
    const modelScore = useSelector(state => state.playgame.modelScore)



    useEffect(() => {

        if (!stopGame) {

            if (timerGame === 0) {
                console.log("timr stop !")
                props.setStopGame(true)
                props.setModelScore(true)
                return
            }

            const interval = setInterval(() => {
                props.setTimerGame(timerGame - 1)
            }, 1200);

            //console.log(timerGame)

            return () => clearInterval(interval);
        }

    })



    const actionCreateScore = () => {

        if (userName === "") {
            swal("การบันทึกคะแนนไม่สำเร็จ", "กรุณากรอกชื่อของคุณ", "warning");
            return
        }

        if (userName.length > 7) {
            swal("การบันทึกคะแนนไม่สำเร็จ", "กรุณาอย่าตั้งชื่อเกิน 7 ตัว", "warning");
            return
        }

        let data = { "userName": userName, "userScore": scoreGame }

        //console.log(data)



        fetch(`${API}/api/accounts/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(res => {
                //console.log('Success');
                console.log(res)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        swal("บันทึกคะแนนเรียบร้อย", "ขอบคุณที่ ร่วมทดสอบและเล่นเกมของเรา :') ", "success");

        props.setModelScore(false)

    }

    const openManual = () => {
        window.open('https://drive.google.com/drive/folders/1Nskdm7oEl3apWYqHZchEQ-eSTOKMsGuU?usp=sharing');
      }


    const startGame = () => {
        props.setScoreGame(0)
        props.setNumberKey(Math.floor(Math.random() * 100))
        props.setTimerGame(time_max)
        props.setStopGame(false)
        props.setModelScore(false)
    }

    const actionStopGame = () => {
        props.setScoreGame(0)
        props.setTimerGame(0)
        props.setNumberKey(0)
        props.setStopGame(true)
        props.setModelScore(false)
    }


    const formatValue = (value) => value.toFixed(0);

    return (

        <Container fluid style={{ textAlign: "center", paddingTop: `5%` }}>
            <Row >
                <Col><h5>หาเลขต่อไปนี้</h5></Col>
            </Row>

            <Row>
                <Col><h3> <AnimatedNumber value={numberKey} formatValue={formatValue} complete={(el) => { if (numberKey !== 0) props.setComplete(el.completed) }} /></h3></Col>
            </Row>

            <Row >
                <Col><hr /></Col>
            </Row>

            <Row >
                <Col>
                    <h6>คะแนนของคุณ : {scoreGame}</h6>
                </Col>
            </Row>

            <Row >
                <Col>
                    <p>เวลาจะหมดใน : {timerGame} s</p>
                    <ProgressBar animated now={timerGame} max={time_max} />
                </Col>
            </Row>

            <Row style={{ paddingTop: '3%' }}>
                <Col>
                    <TableGame />
                </Col>
            </Row>


            {stopGame &&

                <Row style={{ paddingBottom: '1%' }}>
                    <Col><Button variant="warning" size="lg" onClick={() => startGame()} block><FontAwesomeIcon icon={faPlay} /> เริ่มเกม</Button></Col>
                </Row>

            }


            <Row >
                <Col><Button variant="secondary" onClick={openManual} block><FontAwesomeIcon icon={faBook} /> การเล่น - ติดตั้ง</Button></Col>
                <Col> <Link to="/scoreList"><Button variant="secondary" onClick={() => actionStopGame()} block  ><FontAwesomeIcon icon={faListOl} /> อันดับทั้งหมด</Button></Link></Col>
            </Row>

            <Modal show={modelScore} onHide={() => props.setModelScore(false)}
                animation={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>คะแนนของคุณคือ {scoreGame}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>กรอกชื่อของคุณ</Form.Label>
                            <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setModelScore(false)}>
                        ปิด
                    </Button>
                    <Button variant="success" onClick={() => actionCreateScore()}>
                        บันทึกคะแนน
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setScoreGame: (data) => dispatch({ type: 'setScoreGame', payload: data }),
        setComplete: (data) => dispatch({ type: 'setComplete', payload: data }),
        setNumberKey: (data) => dispatch({ type: 'setNumberKey', payload: data }),
        setStopGame: (data) => dispatch({ type: 'setStopGame', payload: data }),
        setTimerGame: (data) => dispatch({ type: 'setTimerGame', payload: data }),
        setModelScore: (data) => dispatch({ type: 'setModelScore', payload: data }),
    }
}

export default connect(null, mapDispatchToProps)(Index)
