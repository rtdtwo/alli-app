// const SERVER_URL = 'http://localhost:4000'
const SERVER_URL = 'https://dhp2022-backend.herokuapp.com'

const ENDPOINTS = {
    signup: '/signup',
    user: '/user',
    goal: '/goal',
    mood: '/mood',
    social: '/social',
    abstinence: '/abstinence'
}

const callGet = (url) => {
    return new Promise((resolve, reject) => {
        console.log('Calling GET ' + url)
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                console.log('Received response for GET ' + url + '\n' + JSON.stringify(jsonData))
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
        console.log('Calling POST ' + url +'\nwith data\n' + JSON.stringify(data))
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log('Received response for POST ' + url + '\n' + JSON.stringify(jsonData))
                resolve(jsonData)
            })
            .catch(error => {
                console.log(error)
                reject({ code: 999, msg: 'Unknown Error' })
            })
    })
}

const callPut = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
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

const callPutWithoutData = (url) => {
    return new Promise((resolve, reject) => {
        console.log('Calling PUT ' + url)
        fetch(url, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log('Received response for PUT ' + url + '\n' + JSON.stringify(jsonData))
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
    },
    getMoodsOfUser: (userId, date) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.mood}/${userId}?date=${date}`)
    },
    createSocialProfile: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.social}/profile`, data)
    },
    getAllGroups: (socialId) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.social}/groups?socialId=${socialId}`)
    },
    createGroup: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.social}/group`, data)
    },
    joinGroup: (groupId, socialId) => {
        return callPutWithoutData(`${SERVER_URL}${ENDPOINTS.social}/group/${groupId}/joinOrLeave?socialId=${socialId}`)
    },
    getGroupsOfUser: (socialId) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.social}/profile/${socialId}/groups`)
    },
    getPostsOfGroup: (groupId, socialId) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.social}/group/${groupId}/posts?socialId=${socialId}&type=all`)
    },
    getPostsOfGroupByUser: (groupId, socialId) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.social}/group/${groupId}/posts?socialId=${socialId}`)
    },
    createPost: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.social}/post`, data)
    },
    likeUnlikePost: (postId, socialId) => {
        return callPutWithoutData(`${SERVER_URL}${ENDPOINTS.social}/post/${postId}/likeUnlike?socialId=${socialId}`)
    },
    createOrUpdateMood: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.mood}`, data)
    },
    getAllAbstinencesOfUser: (userId) => {
        return callGet(`${SERVER_URL}${ENDPOINTS.abstinence}/all?userId=${userId}`)
    },
    createAbstinence: (data) => {
        return callPost(`${SERVER_URL}${ENDPOINTS.abstinence}`, data)
    },
    resetAbstinenceTimer: (id) => {
        return callPutWithoutData(`${SERVER_URL}${ENDPOINTS.abstinence}/${id}/reset`)
    }

}

export default APIS