let authenticated = false 

export function isAuthenticated () {
    return authenticated
}

export function unAuthenticate () {
    authenticated = false
}

export function authenticate () {
    authenticated = true
}