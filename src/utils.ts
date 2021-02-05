import { MONTH_NAMES } from './constants';

export const sleep = (waitTimeInMs: number) => new Promise((resolve) => setTimeout(resolve, waitTimeInMs));


export function toMMSS(value: string) {
    const secNum = parseInt(value, 10); // don't forget the second param
    let hours: number | string = Math.floor(secNum / 3600);
    let minutes: number | string = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds: number | string = secNum - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return minutes + ':' + seconds;
}

export function toHHMMSS(value: string) {
    const secNum = parseInt(value, 10); // don't forget the second param
    let hours: number | string = Math.floor(secNum / 3600);
    let minutes: number | string = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds: number | string = secNum - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

/*
*   https://stackoverflow.com/a/16178864/4457646
*/


export function isEmpty(obj: any) {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
}

const getFormattedDate = (date: any, prefomattedDate: any = false, hideYear = false) => {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day} ${month}`; // at ${hours}:${minutes}
    }

    // 10. January 2017. at 10:20
    return `${day} ${month} ${year} `; // at ${hours}:${minutes}
};


// --- Main function
export const timeAgo = (dateParam: any) => {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today: any = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
};

export const getImageMimeType = (imageName: string) => {
    const imageArray = imageName.split('.');
    const imageType = imageArray[imageArray.length - 1];
    switch (imageType) {
    case 'jfif':
    case 'jpeg':
    case 'jpg':
        return 'image/jpeg';
    case 'png':
        return 'image/png';
    case 'tif':
    case 'tiff':
        return 'image/tiff';
    case 'pjp':
    case 'pjpeg':
        return 'image/pjpeg';
    case 'bmp':
        return 'image/bmp';
    case 'gif':
        return 'image/gif';
    case 'ico':
        return 'image/x-icon';
    default:
        return false;
    }
};