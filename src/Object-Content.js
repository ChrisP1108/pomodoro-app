export const buttonFields = [
    {
        id: 1,
        name: 'pomodoro',     
    },
    {
        id: 2,
        name: 'short break',     
    },
    {
        id: 3,
        name: 'long break',     
    },
]

export const timeFields = [
    {
        id: 1,
        name: 'pomodoro',
        variable: 'pomodoro'
    },
    {
        id: 2,
        name: 'short break',
        variable: 'shortBreak'
    },
    {
        id: 3,
        name: 'long break',
        variable: 'longBreak'
    }
]

export const fontFields = [
    {
        id: 1,
        font: 'Kumbh Sans'
    },
    {
        id: 2,
        font: 'Roboto Slab'
    },
    {
        id: 3,
        font: 'Space Mono'
    }
]

export const colorFields = [
    {
        id: 1,
        color: '#F87070'
    },
    {
        id: 2,
        color: '#70F3F8'
    },
    {
        id: 3,
        color: '#D881F8'
    }
]

export const defaultSettings = {
    pomodoro: [
        {
            minutes: 1,
            seconds: 0
        }
    ],
    shortBreak: [
        {
            minutes: 1,
            seconds: 0
        }
    ],
    longBreak: [
        {
            minutes: 1,
            seconds: 0
        }
    ],
    font: 'Kumbh Sans',
    color: '#F87070',
    button: 'pomodoro'
}

export const defaultTimerState = {
    pomodoro: false,
    shortBreak: false,
    longBreak: false
}

export const defaultClockStatus = {
    pomodoro: 'START',
    shortBreak: 'START',
    longBreak: 'START'
}