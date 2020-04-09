export const calculateLatLong = (degrees, minutes, seconds, direction) => {
    if (Number.isNaN(degrees)) {
        // console.log('isNaN');
        degrees = 0;
    }
    if (Number.isNaN(minutes)) {
        // console.log('isNaN');
        minutes = 0;
    }
    if (Number.isNaN(seconds)) {
        // console.log('isNaN');
        seconds = 0;
    }
    let conversion = degrees + minutes / 60 + seconds / 3600;
    if (direction === 'S' || direction === 'W') {
        conversion *= -1;
    }
    return conversion;
};

export const calculateLength = (size) => {
    let result;
    if (size === 0) {
        result = 7.5;
    } else {
        result = size * 7.5;
    }
    // console.log({ width: `${result}px` });
    return { width: `${result}px` };
};

export const getId = () => {
    let id = Math.random().toString();
    return id;
};

export const clearImgExifdataTag = (file) => {
    file.exifdata = null;
    // console.log(`clearing file field `);
    // file.value = '';
    return;
};

export const removeImg = () => {
    const img = document.querySelector('.img1');
    img.parentNode.removeChild(img);
};

export const setName = (filename) => {
    const capName = filename.toUpperCase();
    const name = capName.substr(0, capName.lastIndexOf('.')) || capName;
    return name;
};

export const findClosestPoint = (origin, point) => {
    //([a1, b1],[a2, b2])
    let a = Math.pow(Math.abs(origin[0] - point[0]), 2);
    let b = Math.pow(Math.abs(origin[1] - point[1]), 2);
    let c = Math.sqrt(a + b);
    return c;
};

// Merge function from earlier
const merge = (direction, arr1, arr2) => {
    let results = [];
    let i = 0;
    let j = 0;
    if (direction === 'asc') {
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i].distanceToTarget < arr2[j].distanceToTarget) {
                results.push(arr1[i]);
                i++;
            } else {
                results.push(arr2[j]);
                j++;
            }
        }
    }
    if (direction === 'dsc') {
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i].uploadDate > arr2[j].uploadDate) {
                results.push(arr1[i]);
                i++;
            } else {
                results.push(arr2[j]);
                j++;
            }
        }
    }
    while (i < arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
};

// Recrusive Merge Sort
export const mergeSort = (direction, arr) => {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(direction, arr.slice(0, mid));
    let right = mergeSort(direction, arr.slice(mid));
    return merge(direction, left, right);
};

const findPointDistance = (originEye, targetEye) => {
    let a = originEye.info.latitude - targetEye.info.latitude;
    let a2 = Math.pow(a, 2);

    let b = originEye.info.longitude - targetEye.info.longitude;
    let b2 = Math.pow(b, 2);

    let c = Math.sqrt(a2 + b2);
    return c;
};

// Math.pow(base, exponent)
// Math.pow(base, 0.5);  // 2 (square root of base)
// Math.sqrt(9); // 3
export const findAndAddDistance = (origin, arrOfUnsortedObjs) => {
    //     let distanced = [];
    // console.log(arrOfUnsortedObjs);
    const distanced = arrOfUnsortedObjs.map((obj) => {
        obj.distanceToTarget = findPointDistance(origin, obj);
        return obj;
    });
    // console.log(distanced);
    return distanced;
};
