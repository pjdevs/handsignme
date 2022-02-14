const items = require('../../src/db/items')

test('there must be items in the db', () => {
    const list = items.getItems()
    
    expect(list).not.toBeNull()
    expect(list).toBeDefined()
})

test('there must be exactly 2 items in the db', () => {
    const list = items.getItems()
    
    expect(list.length).toBe(2)
})
