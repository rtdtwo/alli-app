// const SERVER_URL = 'http://localhost:4000'
const SERVER_URL = 'https://dhp2022-backend.herokuapp.com'

const ENDPOINTS = {
    signup: '/signup',
    user: '/user',
    goal: '/goal'
}

const callGet = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                resolve(jsonData)
            })
            .catch(error => {
                console.log(error)
                reject({ code: 999, msg: 'Unknown Error' })
            })
    })
}

const callPost = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(jsonData => {
                resolve(jsonData)
            })
            .catch(error => {
                console.log(error)
                reject({ code: 999, msg: 'Unknown Error' })
            })
    })
}

const APIS = {
    getUserById: (id) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.user}/${id}`)
    },
    signUp: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.signup}`, data)
    },
    getGoalById: (id) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.goal}/${id}`)
    },
    getAllGoalsOfUser: (userId) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.goal}/all?userId=${userId}`)
    },
    createGoal: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.goal}`, data)
    }
}

export default APIS