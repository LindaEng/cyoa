const navLinks = [
    { name: 'Home', path: '/' , requiresLogin: false},
    { name: 'Learning', path: '/learning' , requiresLogin: true},
    { name: 'Log In', path: '/login' , requiresLogin: false},
    { name: 'Sign Up', path: '/signup', requiresLogin: false},
    { name: 'Account', path: '/account', requiresLogin: true},
    { name: 'Playground', path: '/playground', requiresLogin: true}
]

export {
    navLinks
}