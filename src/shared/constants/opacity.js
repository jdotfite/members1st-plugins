// src/shared/constants/opacity.js
export const OPACITY_OPTIONS = {
    'opacity-0': {
        value: 0,
        label: '0%',
        class: 'bg-opacity-0',
        darkClass: 'dark:bg-opacity-0'
    },
    'opacity-10': {
        value: 10,
        label: '10%',
        class: 'bg-opacity-10',
        darkClass: 'dark:bg-opacity-10'
    },
    'opacity-20': {
        value: 20,
        label: '20%',
        class: 'bg-opacity-20',
        darkClass: 'dark:bg-opacity-20'
    },
    'opacity-30': {
        value: 30,
        label: '30%',
        class: 'bg-opacity-30',
        darkClass: 'dark:bg-opacity-30'
    },
    'opacity-40': {
        value: 40,
        label: '40%',
        class: 'bg-opacity-40',
        darkClass: 'dark:bg-opacity-40'
    },
    'opacity-50': {
        value: 50,
        label: '50%',
        class: 'bg-opacity-50',
        darkClass: 'dark:bg-opacity-50'
    },
    'opacity-60': {
        value: 60,
        label: '60%',
        class: 'bg-opacity-60',
        darkClass: 'dark:bg-opacity-60'
    },
    'opacity-70': {
        value: 70,
        label: '70%',
        class: 'bg-opacity-70',
        darkClass: 'dark:bg-opacity-70'
    },
    'opacity-80': {
        value: 80,
        label: '80%',
        class: 'bg-opacity-80',
        darkClass: 'dark:bg-opacity-80'
    },
    'opacity-90': {
        value: 90,
        label: '90%',
        class: 'bg-opacity-90',
        darkClass: 'dark:bg-opacity-90'
    },
    'opacity-100': {
        value: 100,
        label: '100%',
        class: 'bg-opacity-100',
        darkClass: 'dark:bg-opacity-100'
    }
};

export const OPACITY_CHOICES = Object.entries(OPACITY_OPTIONS).map(([key, data]) => ({
    value: key,
    label: data.label
}));