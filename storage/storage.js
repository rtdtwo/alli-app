import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    user: 'user',
    goals: 'goals'
}

const putValue = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch(e) {
        console.log(e)
    }
} 

const putObject = async (key, json) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(json))
    } catch(e) {
        console.log(e)
    }
} 

const getValue = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch(e) {
        console.log(e)
        return null
    }
}

const getObject = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value != null) {
            return JSON.stringify(value)
        } else {
            return null
        }
    } catch(e) {
        console.log(e)
        return null
    }
}

export const getCurrentUser = () => {
    return getObject(KEYS.user)
}

export const setCurrentUser = (userData) => {
    return putObject(KEYS.user, userData)
}

export const getGoals = () => {
    return getObject(KEYS.goals)
}

export const setGoals = (goals) => {
    return putObject(KEYS.goals, userData)
}

export const getGoal = (id) => {
    getObject(KEYS.goals).then( goals => {
        const filtered = goals.filter(goal => goal.id=id)
        if(filtered.length > 0) {
            return filtered[0]
        } else {
            return null
        }
    })
}