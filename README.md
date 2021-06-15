# React-Autocomplete  

This is a simple light weight select component for react. Initially built for use in STEPS Ejyothi.

## Installation 

```sh
npm install react-autocomplete-npm
```

## Usage

```sh
import React from 'react';
import {Multiselect} from 'react-autocomplete-npm';

const options  = [
    {vale: 1, label: "Angular"},
    {value: 2, label: "React"},
    {value: 3, label: "View"},
    {value: 4, label: "Love JS"}
];

export default class App extends React.Component {
    state = {
        selectedItem: null,
    };
    handleChange = selectedItem => {
        this.setState({ selectedItem });
        console.log(`Option selected:`, selectedItem);
    };
    render () {
        const { selectedItem } = this.state;
        return (
            <div className="App">
                <Multiselect
                    placeholder={'Search Items'}
                    data={options}
                    value={selectedOption}
                    handleOnChange={this.handleChange}
                />
            </div>
        );
    }
}

```
