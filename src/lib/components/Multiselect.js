import React from 'react';
import './styles/style.css';

export default class Multiselect extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            data: this.props.data,
            optionExpand: false,
            selectedItem: {},
            selectedItemLabel: '',
            focuzOptionIndex: 0,
            searchTerm: '',
            isMultiSelect: this.props.isMultiSelect ? this.props.isMultiSelect : false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.watchForChange = this.watchForChange.bind(this);
        this.clearResults = this.clearResults.bind(this);
        this.optionItemHover = this.optionItemHover.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.watchForChange();
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    componentDidUpdate(prevProps) {
        if (this.state.isMultiSelect) {
            
            if (this.props.value && this.props.value instanceof Array && JSON.stringify(this.props.value) !== JSON.stringify(prevProps.value)) {
                
                this.watchForChange();
            }
        } else {
            let prevValue = (prevProps.value && typeof prevProps.value === 'object' && prevProps.value.hasOwnProperty('value')) ? prevProps.value.value : null;
            if (this.props.value && typeof this.props.value === 'object' && this.props.value.hasOwnProperty('value')) {
                if (this.props.value.value !== prevValue || JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
                    this.watchForChange();
                }
            }
        }
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                optionExpand: false,
            });
        }
    }
    watchForChange = () => {
        if (this.props.data) {
            this.setState({
                data: this.props.data,
            });
            if (this.state.isMultiSelect) {
                let selectedItems = [];
                if (this.props.value && this.props.value instanceof Array) {
                    
                    selectedItems = this.props.value.map((item) => {
                        if (item.value) {
                            let index = this.props.data.findIndex(x => x.value === item.value);
                            let res = this.props.data[index];
                            if (item) {
                                return res;
                            }
                        }
                    });
                    
                }
                this.setState({
                    selectedItem: selectedItems,
                })
            }
            else if (this.props.value && this.props.value.value) {
                let index = this.props.data.findIndex(x => x.value === this.props.value.value);
                if (index !== -1) {
                    let item = this.props.data[index];
                    //this.onItemSelect(item);
                    this.setState({
                        selectedItem: item,
                    })
                }
            }
        }
    }
    handleChange = (event) => {
        let searchTerm = event.target.value;
        let options = [];
        if (searchTerm) {
            options = this.props.data.filter(category => category.label.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            options = this.props.data;
        }
        this.setState({
            data: options,
            searchTerm: searchTerm,
        });
    }
    handleClick = () => {
        this.setState({
            data: this.props.data,
            optionExpand: true,
            focuzOptionIndex: 0,
        });
    }
    onItemSelect = (item) => {
        this.setState({
            optionExpand: false,
            searchTerm: '',
        }, function () {
            if (this.props.handleOnChange) {
                this.props.handleOnChange(item);
            }
        });
    }
    handleKeyDown = (event) => {
        let optionIndex = this.state.focuzOptionIndex;
        if (this.state.data.length) {
            if (event.keyCode === 40) {
                if (optionIndex === this.state.data.length - 1) { // Last item
                    optionIndex = 0;
                } else {
                    optionIndex = optionIndex + 1;
                }
            } else if (event.keyCode === 38) {
                if (optionIndex === 0) { // First item
                    optionIndex = this.state.data.length - 1;
                } else {
                    optionIndex = optionIndex - 1;
                }
            } else if (event.keyCode === 13) {
                let data = this.state.data;
                let item = data[optionIndex];
                this.onItemSelect(item);
                document.getElementById('search-box').blur();
            }
        }
        this.setState({
            focuzOptionIndex: optionIndex,
        })
    }
    clearResults = () => {
        let selectedItem = {};
        this.setState({
            selectedItem: selectedItem,
            optionExpand: false,
            searchTerm: '',
        }, function () {
            if (this.props.handleOnChange) {
                this.props.handleOnChange(selectedItem);
            }
        });
    }
    optionItemHover = (index) => {
        this.setState({
            focuzOptionIndex: index,
        })
    }
    handleRemoveClick = () => {
        // TODO: Implement the remove item functionality
    }
    render() {
        console.log((typeof this.state.selectedItem !== 'undefined' && this.state.selectedItem instanceof Array && this.state.isMultiSelect));
        return (
            <div className="App">
                <div className={'search-container'} ref={this.wrapperRef}>
                    <div className={'search-right-section'}>
                        {(typeof this.state.selectedItem !== 'undefined' && this.state.selectedItem instanceof Array && this.state.isMultiSelect) &&
                            <>
                            {this.state.selectedItem.map((item)=>(
                             <div className={'selected-item'}>
                                <div className={'selected-item-label'}>
                                    {item.label}
                                </div>
                                <div className={'selected-item-cancel'} onClick={this.handleRemoveClick}>
                                    X
                                </div>
                            </div>
                            ))}
                            </>                            
                        }
                        {(typeof this.state.selectedItem !== 'undefined' && typeof this.state.selectedItem.label !== 'undefined' && !this.state.isMultiSelect) &&
                            <div className={'selected-item'}>
                                <div className={'selected-item-label'}>
                                    {this.state.selectedItem.label}
                                </div>
                                <div className={'selected-item-cancel'} onClick={this.handleRemoveClick}>
                                    X
                                </div>
                            </div>
                        }
                        <input
                            value={this.state.searchTerm}
                            type="text"
                            onClick={this.handleClick}
                            onChange={this.handleChange}
                            placeholder={(Object.keys(this.state.selectedItem).length === 0) ? (this.props.placeholder ? this.props.placeholder : 'Search Items') : ''}
                            className={'search-box'}
                            onKeyDown={this.handleKeyDown}
                            id={"search-box"}
                        />
                        <div className={'selected-item-cancel'} onClick={this.clearResults}>
                            X
                        </div>
                    </div>
                    {(this.state.optionExpand) &&
                        <div id='list' className={'list'}>
                            {(this.state.data && this.state.data.length) ?
                                <>
                                    {this.state.data.map((item, key) =>
                                        <option onMouseOver={() => this.optionItemHover(key)} className={this.state.focuzOptionIndex == key ? "highlight-option options" : "options"} id={key} onClick={() => this.onItemSelect(item)} value={item.value}>{item.label}</option>
                                    )
                                    }
                                </>
                                : <div className={'no-item-found'}><span>No items found</span></div>
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}
