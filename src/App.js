import React from 'react';
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
            value: {value: 3, label: "Angular"},
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (item) => {
        this.setState({
            //categories: categories,
            value: item,
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
            isMultiSelect={false}
        />
    </div>
  );
    }
}
