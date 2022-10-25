# createSelector
![example workflow](https://github.com/Adamduehansen/createSelector/actions/workflows/node.js.yml/badge.svg)

`createSelector` creates a selector for you, so you don't have to remember how one is created! It uses a declarative syntax so that it is simple for you to define what the selector should find.

## Features
✅ selectors with tag name, id and class names

✅ ***and*** constraints so that combinations with tag name, id and class names can be created

❌ ***not*** constraints so that selectors can be created with the :not()-selector (I may add this at some point)

## Usage

```javascript
// CJS
const createSelector = require('@adamduehansen/create-selector').default;

// ESM
import createSelector from '@adamduehansen/create-selector';
```

## Examples

```javascript
// Selecting a div element with the id of 'some-id'
const selector = createSelector()
  .withTagName('div')
  .and()
  .withId('some-id')
  .toString();
console.log(selector); // div#some-id

// Selecting an id of 'some-id' and a few classes
const selector = createSelector()
  .withId('signupButton')
  .and()
  .withClassName('btn')
  .and()
  .withClassName('disabled')
  .toString();
console.log(selector); // #signupButton.btn.disabled
```

*Why you would use this - I don't know. I just though it would be cool!*