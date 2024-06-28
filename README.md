# React-Autocomplete  

This is a simple light weight autocomplete select component for react. Initially built for use in STEPS Ejyothi.

## Live Demo

Check out the [React Autocomplete Sandbox](https://codesandbox.io/p/sandbox/react-autocomplete-fnyjz8?file=%2Fpackage.json%3A8%2C23) for a live demo.

## Installation 

```sh
npm install react-autocomplete-npm
```

## Usage

```sh
import { useState, React } from 'react';
import { Multiselect } from 'react-autocomplete-npm';

const options = [
  { vale: 1, label: "Angular" },
  { value: 2, label: "React" },
  { value: 3, label: "View" },
  { value: 4, label: "LoveJS" }
];

function App() {
  const [selectedItem, handleChange] = useState(null);
  return (
    <div className="App">
      <Multiselect
        placeholder={'Search Items'}
        data={options}
        value={selectedItem}
        handleOnChange={handleChange}
      />
    </div>
  );
}

export default App;

```
