# React Block Renderer

Dynamic React component renderer.

## Overview

**React Block Renderer** helps you to render React components dynamically from a json object.

### Getting Started

Install `react-block-renderer`

```shell
npm install react-block-renderer --save
```

### How to use

**React Block Renderer** has a single component `Block` which expect to get a list of properties.
| Property | Description | Value | Required |
| --- | --- | --- | --- |
| id | identifier of the rendered block | string | :heavy_check_mark:
| type | HTML tag or component name | string | :heavy_check_mark:
| content | content to be rendered. Here you can nest multiple blocks passing an array with this properties structure. | string \| [BlockProps[]]() | :heavy_check_mark:
| properties | custom properties required for the component to be rendered | object |
| key | used when you work with list of elements into a loop | string \| number |
| className | custom class name for the component to be rendered | string |
| styles | custom styles for the component to be rendered | [NestedCSSProperties[]](https://github.com/typestyle/typestyle/blob/f8cd6a01ab005efc638937615b87cbe9e562c8dd/src/types.ts#L29) |

So you just need something like this:
```
// declare the properties for the block
const blockProps = {
  id: "1"
  type: "div"
  content: "Text content"
}

// pass the properties to a Block tag
<Block {...blockProps} />

// this will result in something like
<div id="1">Text content</div>
```

A more complete example can be found in [demo.html]() (in construction)

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