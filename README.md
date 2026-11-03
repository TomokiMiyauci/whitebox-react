# whitebox-react

React renderer for [whitebox](https://github.com/TomokiMiyauci/whitebox).

## Install

```bash
npx jsr add @whitebox/react
```

## Usage

The `@template` decorator renders React virtual nodes returned by the template function for the custom element.

```tsx
import { template } from "@whitebox/react";

@template(({ handleClick }) => <button onClick={handleClick} />)
class MyButton extends HTMLElement {
  handleClick = (): void => {
    console.log("clicked");
  };
}
```

Reactive dependencies accessed during rendering are tracked by whitebox, triggering re-rendering when they change.

## License

[MIT](LICENSE)
