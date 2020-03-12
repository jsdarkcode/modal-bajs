# 📦 Modal BaJS

## Installation

```
npm install notify-bajs
```

## Usage

```js
import ModalBaJS from "modal-bajs";

const modal = ModalBaJS({
  content: "<h1>Hello world</h1>"
});
```

## Methods

### show()

Manually opens a modal

```js
modal.show();
```

### hide()

Manually hides a modal

```js
modal.hide();
```

### setContent()

```js
modal.setContent("<b>New content here</b>");
```

### update()

Manually update options a modal

```js
modal.update({
  animation: "slideup",
  maxWidth: 300,
  closable: false
});
```

## Optional parameters

- `animation`: (string) - `popup` `sideup` (default: `popup`)
- `classContainer`: (string) - Customized CSS class
- `content`: (string) - Content of the modal
- `mask`: (boolean) - Whether show mask or not (default: `true`)
- `closable`: (boolean) - Whether a close (x) button is visible on top right of the modal dialog or not (default: `true`)
- `maskClosable`: (boolean) - Whether to close the modal dialog when the mask (area outside the modal) is clicked (default: `true`)
- `escClosable`: (boolean) - Whether support press `esc` to close (default: `true`)
- `maxWidth`: (number) - Width of the modal dialog
