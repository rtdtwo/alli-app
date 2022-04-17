export const MOODS_COLOR = {
    'happy': '#00b894',
    'sad': '#0984e3',
    'angry': '#d63031',
    'disgust': '#e17055',
    'scared': '#fdcb6e',
    'stressed': '#6c5ce7',
    'upset': '#74b9ff',
    'depressed': '#e84393',
}

export const MOODS = [
    {
        name: 'Happy',
        key: 'happy',
        color: '#00b894',
    },
    {
        name: 'Sad',
        key: 'sad',
        color: '#0984e3',
    },
    {
        name: 'Angry',
        key: 'angry',
        color: '#d63031',
    },
    {
        name: 'Disgust',
        key: 'disgust',
        color: '#e17055',
    },
    {
        name: 'Scared',
        key: 'scared',
        color: '#fdcb6e',
    },
    {
        name: 'Stressed',
        key: 'stressed',
        color: '#6c5ce7',
    },
    {
        name: 'Upset',
        key: 'upset',
        color: '#74b9ff',
    },
    {
        name: 'Depressed',
        key: 'depressed',
        color: '#e84393',
    }
]

export const SUBSTANCES = [
    {
        key: 'alcohol',
        name: 'Alcohol',
        icon: 'glass-wine',
        image: 'https://images.pexels.com/photos/4973806/pexels-photo-4973806.jpeg'
    },
    {
        key: 'tobacco',
        name: 'Tobacco',
        icon: 'smoking',
        image: 'https://images.pexels.com/photos/405082/pexels-photo-405082.jpeg'
    },
    {
        key: 'marijuana',
        name: 'Marijuana',
        icon: 'cannabis',
        image: 'https://images.pexels.com/photos/405082/pexels-photo-405082.jpeg'
    },
    {
        key: 'drugs',
        name: 'Drugs',
        icon: 'pill',
        image: 'https://images.pexels.com/photos/5722883/pexels-photo-5722883.jpeg'
    },
    {
        key: 'caffeine',
        name: 'Caffeine',
        icon: 'coffee-outline',
        image: 'https://images.pexels.com/photos/3832248/pexels-photo-3832248.jpeg'
    }
]

export const GET_SUBSTANCE = (key) => {
    const filtered = SUBSTANCES.filter(substance => substance.key === key)
    if (filtered.length > 0) {
        return filtered[0]
    } else {
        return null
    }
}