export const getSplitTime = (dateMillis) => {
    let seconds = dateMillis / 1000
    let days        = Math.floor(seconds/24/60/60);
    let hoursLeft   = Math.floor((seconds) - (days*86400));
    let hours       = Math.floor(hoursLeft/3600);
    let minutesLeft = Math.floor((hoursLeft) - (hours*3600));
    let minutes     = Math.floor(minutesLeft/60);
    let remainingSeconds = seconds % 60;

    return {
        days: parseInt(days),
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(remainingSeconds)
    }
}

export const pad = (n) => {
    return (n < 10 ? "0" + n : n);
}

