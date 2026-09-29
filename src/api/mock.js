// Helpers that make the fake backend feel real.
export const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms))

let counter = 1000
export const fakeId = (prefix = 'id') => `${prefix}_${++counter}`
