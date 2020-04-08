const mapStyle = [
    {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#444444'
            }
        ]
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'off'
            },
            {
                hue: '#ff0000'
            },
            {
                weight: '8.82'
            },
            {
                lightness: '82'
            },
            {
                gamma: '9.14'
            }
        ]
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                weight: '2.00'
            },
            {
                saturation: '100'
            },
            {
                hue: '#ff4500'
            }
        ]
    },
    {
        featureType: 'administrative.province',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ff0000'
            },
            {
                gamma: '10.00'
            },
            {
                weight: '10.00'
            },
            {
                lightness: '100'
            },
            {
                saturation: '100'
            },
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative.province',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                color: '#ffa600'
            },
            {
                weight: '2'
            }
        ]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'off'
            },
            {
                hue: '#ff00e7'
            },
            {
                weight: '10.00'
            }
        ]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'off'
            },
            {
                weight: '7.11'
            },
            {
                gamma: '0.00'
            },
            {
                lightness: '-79'
            },
            {
                saturation: '42'
            },
            {
                hue: '#ff00fb'
            }
        ]
    },
    {
        featureType: 'administrative.neighborhood',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative.neighborhood',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'off'
            },
            {
                hue: '#3600ff'
            },
            {
                weight: '9.41'
            }
        ]
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
            {
                color: '#f2f2f2'
            },
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'off'
            },
            {
                weight: '5.99'
            }
        ]
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'landscape.natural',
        elementType: 'all',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
            {
                weight: '7'
            },
            {
                visibility: 'off'
            },
            {
                saturation: '50'
            }
        ]
    },
    {
        featureType: 'poi.attraction',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'all',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'poi.place_of_worship',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.school',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.sports_complex',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'road',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            {
                color: '#46bcec'
            },
            {
                visibility: 'on'
            }
        ]
    }
];

export default mapStyle;
