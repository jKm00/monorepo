import { browser } from "$app/environment";
import { writable } from "svelte/store";

type Theme = 'light' | 'dark'

const KEY = 'theme'


const storedValue = browser ? window.localStorage.getItem(KEY) : undefined 
const initialValue = storedValue ? storedValue : 'light'

export const theme = writable<Theme>(initialValue as Theme)

theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('theme', value)
        const body = document.querySelector('body')

        if (body) {
            body.classList.remove('dark')
            body.classList.remove('light')
            body.classList.add(value)
        }
    }
})

