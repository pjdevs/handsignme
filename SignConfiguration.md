An example config :

```js
[
    {
    email: 'foo1@bar.com',
        signature: {
            rect: {
                x: 0.65,
                y: 0.85,
                width: 0.3,
                height: 0.1,
                color: 'purple'
            },
            color: 'black'
        },
        page: 1
    },
    {
        email: 'foo2@bar.com',
        signature: {
            rect: {
                x: 0.25,
                y: 0.85,
                width: 0.3,
                height: 0.1,
                color: 'red'
            },
            color: 'black'
        },
        page: 1
    }
]
```

or stringified

```json
[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1},{"email":"foo2@bar.com","signature":{"rect":{"x":0.25,"y":0.85,"width":0.3,"height":0.1,"color":"red"},"color":"black"},"page":1}]
```