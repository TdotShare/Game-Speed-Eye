import React from 'react'
import { Table as TableBoots, Button } from 'react-bootstrap';
import AnimatedNumber from "animated-number-react";

import { connect, useSelector } from 'react-redux'

function Table(props) {

    const completeRandom = useSelector(state => state.playgame.completeRandom)
    const playGame = useSelector(state => state.playgame.playGame)
    const scoreGame =  useSelector(state => state.playgame.scoreGame)
    const numberKeyGame = useSelector(state => state.playgame.numberKey)
    const [columnMax] = React.useState(3)
    const [rowMax] = React.useState(4)
    const [numberMockup, setNumberArr] = React.useState(Array(rowMax).fill(Array(columnMax).fill(0)))
    const timerGame = useSelector(state => state.playgame.timerGame)
    const formatValue = (value) => value.toFixed(0);

    React.useEffect(() => {

        if (completeRandom && !playGame) {
            genTableNumber()
        }

        if (timerGame === 0  && playGame) {
            console.log("EndGame !")
            props.setComplete(false)
            props.setPlay(false)
            //setNumberArr(Array(rowMax).fill(Array(columnMax).fill(0)))
        }

     // eslint-disable-next-line
    })

    const genNumber = () => {
        let number = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
        if (parseInt(number) === parseInt(numberKeyGame)) {
            number = parseInt(number) + 1
        }
        return parseInt(number)
    }

    const genPackNumbers = () => {
        let arr = []
        for (let i = 0; i < columnMax; i++) {
            arr.push(genNumber())
        }
        return arr
    }

    const genTableNumber = () => {

        let item = numberMockup

        for (let i = 0; i < item.length; i++) {
            for (let k = 0; k < item[i].length; k++) {
                item[i] = genPackNumbers()

            }
        }


        //console.log(`${random_sort} % ${random_mods} = ${random_sort % random_mods}`)
        let random_mainarr = Math.floor(Math.random() * rowMax);
        let random_subarr = Math.floor(Math.random() * columnMax);
        // console.log(random_mainarr)
        // console.log(random_subarr)
        // console.log(`${random_mainarr} % ${item.length} = ${random_mainarr % item.length}`)
        // console.log(`${random_subarr} % ${item[random_mainarr].length} = ${random_subarr % item[random_mainarr].length}`)
        // console.log(`btn == ${item[random_mainarr % item.length][random_subarr % item[random_mainarr].length]}`)
        // console.log(`key == ${numberKeyGame}`)
        item[random_mainarr % item.length][random_subarr % item[random_mainarr].length] = numberKeyGame
        setNumberArr(item)
        props.setPlay(true)
        props.setComplete(true)

    }

    const checkNumberBtn = (number) =>{
        if(number !== 0 && timerGame !== 0){
            if(number === numberKeyGame){
                //WIN 
                props.setTimerGame(timerGame + 3)
                props.setScoreGame(scoreGame + 10)
                props.setComplete(false)
                props.setPlay(false)
                setNumberArr(Array(rowMax).fill(Array(columnMax).fill(0)))
                props.setNumberKey(Math.floor(Math.random() * 100))
            }else{
                //LOST
                setNumberArr(Array(rowMax).fill(Array(columnMax).fill(0)))
                props.setScoreGame(0)
                props.setTimerGame(0)
                props.setComplete(false)
                props.setPlay(false)
                props.setStopGame(true)
                props.setModelScore(true)
                console.log("lost !")
            }
        }
    }

    return (
        <TableBoots bordered >
            <tbody>{
                numberMockup.map((el, index) => {
                    return (
                        <tr key={index}>
                            {
                                el.map((le, k) => {
                                    return (
                                        <td key={k}><Button variant={`${completeRandom ? "success" : "danger"}`}  onClick={() => checkNumberBtn(le)} block>
                                            <AnimatedNumber key={le + 1} value={le} formatValue={formatValue} />
                                        </Button></td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }</tbody></TableBoots>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setNumberKey: (data) => dispatch({ type: 'setNumberKey', payload: data }),
        setComplete: (data) => dispatch({ type: 'setComplete', payload: data }),
        setPlay: (data) => dispatch({ type: 'setPlay', payload: data }),
        setScoreGame: (data) => dispatch({ type: 'setScoreGame', payload: data }),
        setStopGame: (data) => dispatch({ type: 'setStopGame', payload: data }),
        setTimerGame: (data) => dispatch({ type: 'setTimerGame', payload: data }),
        setModelScore: (data) => dispatch({ type: 'setModelScore', payload: data }),
    }
}

export default connect(null, mapDispatchToProps)(Table)
