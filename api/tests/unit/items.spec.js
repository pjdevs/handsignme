const users = require('../../src/services/users')

test('there must be users', () => {
    const list = users.getUsers()
    
    expect(list).not.toBeNull()
    expect(list).toBeDefined()
})

test('there must be exactly 2 items in the db', () => {
    expect(users.getUsers().length).toBe(2)
})
