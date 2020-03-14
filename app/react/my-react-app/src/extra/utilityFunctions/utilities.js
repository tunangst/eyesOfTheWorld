export const calculateLatLong = (degrees, minutes, seconds, direction) => {
    let conversion = degrees + minutes / 60 + seconds / 3600;
    if (direction === 'S' || direction === 'W') {
        conversion *= -1;
    }
    return conversion;
};

export const calculateLength = size => {
    let result;
    if (size === 0) {
        result = 7.5;
    } else {
        result = size * 7.5;
    }
    return { width: `${result}px` };
};

export const getId = () => {
    let id = Math.random().toString();
    return id;
};

export const clearImgExifdataTag = file => {
    file.exifdata = null;
    console.log(`clearing file field `);
    // file.value = '';
    return;
};

export const removeImg = () => {
    const img = document.querySelector('.img1');
    img.parentNode.removeChild(img);
};

// export const goToMapId = eyeDataObj => {
//     console.log(`clicked on this marker with id: ${id}`);
//     // <Redirect to=`/eyes/:id=${id}`;
// };
