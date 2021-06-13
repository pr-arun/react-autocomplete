import React from 'react';
import './App.css';
import {Multiselect} from './lib';

let superCategories = [
    {value: 1, label: "PHP"},
    {value: 2, label: "Laravel"},
    {value: 3, label: "Angular"},
    {value: 4, label: "React"}
];

export default class App extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            categories: superCategories,
            value: 1,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (item) => {
        console.log(item);
        let categories =  [
    {value: 1, label: "PHP"},
    {value: 2, label: "Laravel"},
    {value: 3, label: "Angular"},
];
        if (item.value == 3) {
        categories.push({value: 4, label: "4"})
        }
    this.setState({
        categories: categories,
        value: item.value,
    });
    }
 
    render () {
  return (
    <div className="App">
        <Multiselect
            placeholder={"Custom placeholder"}
            data={this.state.categories}
            value={this.state.value}
            handleOnChange={this.handleChange}
        />
    </div>
  );
    }
}
