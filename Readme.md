# React Block Renderer

Dynamic React component renderer.

## Overview

**React Block Renderer** helps you to render React components dynamically from a json object.

### Getting Started

Install `react-block-renderer` (not published yet)

```shell
npm install react-block-renderer --save
```

### How to use

**React Block Renderer** has a component `Block` which expect to get a list of properties.
| Property | Description | Value | Required |
| --- | --- | --- | --- |
| id | identifier of the rendered block | string | :heavy_check_mark:
| type | HTML tag or component name | string | :heavy_check_mark:
| content | content to be rendered. Here you can nest multiple blocks passing an array with this properties structure. | string \| [BlockProps[]](https://github.com/srbarba/react-block-renderer/blob/e8437b2218ead2c93ba53a668fb484423cfb7023/src/blockRenderer.tsx#L19) | :heavy_check_mark:
| properties | custom properties required for the component to be rendered | object |
| key | used when you work with list of elements into a loop | string \| number |
| className | custom class name for the component to be rendered | string |
| styles | custom styles for the component to be rendered | [NestedCSSProperties[]](https://github.com/typestyle/typestyle/blob/f8cd6a01ab005efc638937615b87cbe9e562c8dd/src/types.ts#L29) |

Working with HTML tags, you just need something like this:
```
import { Block } from 'react-block-renderer';

// declare the properties for the block
const blockProps = {
  id: "1"
  type: "div"
  content: "Text content"
}

// pass the properties to a Block tag
<Block {...blockProps} />

// result
<div id="1">Text content</div>
```

If you want to work with React components, you will need to add it first to the BlockTypes list:

```
import { Block, BlockTypes } from 'react-block-renderer';

// declare a React functional or class component
const Component = (blockProps) => {
  const {children, ...props} = blockProps;
  return <div {...props}>{children}</div>;
};

// get BlockTypes instance and set the new component(s)
BlockTypes.getInstance().setTypes({ Component });

// then declare block properties with type Component
const blockProps = {
  id: "1"
  type: "Component"
  content: "Text content"
}

// pass the properties to a Block tag
<Block {...blockProps} />

// result
<div id="1">Text content</div>
```

## Working with styles

With this library you will be able to work styles of your components dynamically. We use **[typestyle](https://github.com/typestyle/typestyle)** to work with styles.

You can pass an object or an array of objects with the styles values. Something like:

```
styles: {
  color: "green",
  fontSize: "12px"
}

// or you can use an array of objects

styles: [
  {color: "green"},
  {fontSize: "12px"}
]
```

You can nest the styles:
```
styles: {
  color: "green",
  $nest: {
    '&:hover': {
      color: 'red'
    }
  }
}
```

You can use media queries working with nest styles:
```
styles: {
  color: "green",
  $nest: {
    '@media screen and (-webkit-min-device-pixel-ratio: 0)': {
      color: 'red'
    }
  }
}
```

You can use camel case or quoted strings for the property names:
```
styles: {
  fontSize: "12px",
  "text-color": "white"
}
```

For more info you can check at **[typestyle](https://github.com/typestyle/typestyle)** documentation.

## Running the tests

You can run the tests with command:

```
npm run test
```

If you want to execute the coverage you can execute:

```
npm run test:cov
```

### Dependencies

**React Block Renderer** has two peer dependencies that you should install in your project: react, react-dom. NPM will not install it automatically but it will show you a warning message with instructions on how to install them.

We use **[typestyle](https://github.com/typestyle/typestyle)** library to work with custom dynamic styles. Please, check the **[documentation]()** to know more about how this library works.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.