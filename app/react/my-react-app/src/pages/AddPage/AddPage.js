import React, { useState, useEffect } from 'react';

import MapSection from './MapSection';
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';

// import createMap from '../../extra/googleMaps/createMap';

import {
    calculateLatLong,
    getId,
    clearImgExifdataTag
} from '../../extra/utilityFunctions/utilities';
import EXIF from '../../../node_modules/exif-js/exif';

const initialState = {
    imgSrc: '',
    imgId: '',
    info: {
        latitude: '???',
        longitude: '???',
        camera: '???',
        date: '???',
        width: '???',
        height: '???',
        aperture: '???',
        shutter: '???',
        iso: '???',
        exposure: '???',
        light: '???',
        flash: '???',
        flashStrength: '???',
        contrast: '???',
        saturation: '???',
        sharpness: '???',
        brightness: '???',
        whiteBalance: '???',
        zoom: '???',
        artist: '???',
        software: '???',
        copyright: '???'
    }
};

const AddPage = props => {
    const [state, setState] = useState(initialState);

    const handleFileChange = targetFileLocation => {
        const newId = getId();
        const reader = new FileReader();
        reader.onload = function() {
            setState({
                ...state,
                imgSrc: reader.result,
                imgId: newId
            });
        };
        reader.readAsDataURL(targetFileLocation);
    };

    const handleFindData = () => {
        const img1 = document.getElementById(state.imgId);
        EXIF.getData(img1, () => {
            console.log(`running exif`);

            let latitude;
            let longitude;
            const tags = EXIF.getAllTags(img1);
            //~~~~~~~~~~~~~~lat-lon start~~~~~~~~~~~~~~~~~~~~~~
            const lat = tags.GPSLatitude;
            const latDegree = lat[0].numerator / lat[0].denominator;
            const latMinute = lat[1].numerator / lat[1].denominator;
            const latSecond = lat[2].numerator / lat[2].denominator;
            const latDirection = tags.GPSLatitudeRef;
            const GPSLatitude = [latDegree, latMinute, latSecond, latDirection];

            const lon = tags.GPSLongitude;
            const lonDegree = lon[0].numerator / lon[0].denominator;
            const lonMinute = lon[1].numerator / lon[1].denominator;
            const lonSecond = lon[2].numerator / lon[2].denominator;
            const lonDirection = tags.GPSLongitudeRef;
            const GPSLongitude = [
                lonDegree,
                lonMinute,
                lonSecond,
                lonDirection
            ];

            latitude = calculateLatLong(
                GPSLatitude[0],
                GPSLatitude[1],
                GPSLatitude[2],
                GPSLatitude[3]
            );
            longitude = calculateLatLong(
                GPSLongitude[0],
                GPSLongitude[1],
                GPSLongitude[2],
                GPSLongitude[3]
            );
            const zoom = tags.DigitalZoomRation;
            const zoomCalc = zoom.numerator / zoom.denominator;
            const aperture = tags.ApertureValue;
            const apertureCalc = aperture.numerator / aperture.denominator;
            const exposure = tags.ExposureTime;
            const exposureCalc = exposure.numerator / exposure.denominator;

            const enterInfo = {
                latitude: latitude,
                longitude: longitude,
                camera: tags.Model,
                date: tags.DateTimeOriginal,
                width: tags.PixelXDimension,
                height: tags.PixelYDimension,
                aperture: apertureCalc,
                shutter: tags.ShutterSpeed,
                iso: tags.ISOSpeedRatings,
                exposure: exposureCalc,
                light: tags.LightSource,
                flash: tags.Flash,
                flashStrength: tags.FlashEnergy,
                contrast: tags.Contrast,
                saturation: tags.Saturation,
                sharpness: tags.Sharpness,
                brightness: tags.BrightnessValue,
                whiteBalance: tags.WhiteBalance,
                zoom: zoomCalc,
                artist: tags.Artist,
                software: tags.Software,
                copyright: tags.Copyright
            };

            setState({
                ...state,
                info: {
                    ...enterInfo
                }
            });
        });
        //clear exifdata obj attacked to img so new image data can be updated
        clearImgExifdataTag(img1);
    };
    const handleFileDrop = event => {
        const fileInput = document.querySelector('#insertedImg');
        fileInput.files = event.dataTransfer.files;
        event.preventDefault();

        handleFileChange(fileInput.files[0]);
    };

    useEffect(() => {
        state.imgSrc && handleFindData();
    }, [state.imgSrc]);

    let initMarker;
    if (state.info.latitude === '???' || state.info.longitude === '?') {
        initMarker = {
            latitude: 0,
            longitude: 0
        };
    } else {
        initMarker = null;
    }

    return (
        <main className='add'>
            <MapSection markers={!initMarker && [state.info]} />

            <ImageSection
                imgId={state.imgId}
                imgSrc={state.imgSrc}
                handleFileChange={handleFileChange}
                handleFindData={handleFindData}
                handleFileDrop={handleFileDrop}
            />
            <InfoSection info={state.info} />
        </main>
    );
};

export default AddPage;
