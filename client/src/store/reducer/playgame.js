const initialState = {
    completeRandom: false,
    playGame: false,
    modelScore: false,
    numberKey: 0,
    stopGame: true,
    scoreGame: 0,
    timerGame: 0,
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'setComplete':
            return {
                ...state,
                completeRandom: action.payload
            }
        case 'setPlay':
            return {
                ...state,
                playGame: action.payload
            }
        case 'setNumberKey':
            return {
                ...state,
                numberKey: action.payload
            }
        case 'setStopGame':
            return {
                ...state,
                stopGame: action.payload
            }
        case 'setScoreGame':
            return {
                ...state,
                scoreGame: action.payload
            }
        case 'setTimerGame':
            return {
                ...state,
                timerGame: action.payload
            }
        case 'setModelScore':
            return {
                ...state,
                modelScore: action.payload
            }
        default:
            return state
    }
}

export default reducer;