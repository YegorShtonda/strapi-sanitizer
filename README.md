# strapi-sanitizer
It's util for sanitizing object/array by custom models

## Install
`$ npm i strapi-sanitizer`
or
`$ yarn add strapi-sanitizer`

# Usage
```javascript
const sanitizer = require('strapi-sanitizer')

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.restaurant.find()
    return sanitizer(entity, {
      id: true,
      name: true,
      address: {
        city: true,
        street: true,
        build: true,
      },
      menu: [
        {
          id: true,
          type: true,
          dishes: [
            id: true,
            price: {
              full: true,
              price: true,
              tax: true,
            },
          ],
        }
      ],
      owner: 'info.fullname',
    })
  },
}
```

or

```javascript
const sanitizer = require('strapi-sanitizer')

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.restaurant.find()
    return sanitizer(entity, 'Restaurant')
  },
}
```

`strapi-project/sanitizer/Restaurant.js`

```javascript
module.exports = {
  id: true,
  name: true,
  address: {
    city: true,
    street: true,
    build: true,
  },
  menu: [
    {
      id: true,
      type: true,
      dishes: [
        id: true,
        price: {
          full: true,
          price: true,
          tax: true,
        },
      ],
    }
  ],
  owner: 'info.fullname',
}
```
