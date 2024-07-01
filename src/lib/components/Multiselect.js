import React from 'react';
import './styles/style.css';

export default class Multiselect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            optionExpand: false,
            selectedItem: {},
            focuzOptionIndex: 0,
            searchTerm: '',
            isMultiSelect: this.props.isMultiSelect ? this.props.isMultiSelect : false,
        };
        this.wrapperRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
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
            let currentValue = this.props.value && typeof this.props.value === 'object' && this.props.value.hasOwnProperty('value') ? this.props.value.value : null;
            if (currentValue !== prevValue || JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
                this.watchForChange();
            }
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ optionExpand: false });
        }
    }

    watchForChange() {
        if (this.props.data) {
            let dataOptions = [...this.props.data];
            if (this.state.isMultiSelect) {
                let selectedItems = [];
                if (this.props.value && this.props.value instanceof Array) {
                    selectedItems = this.props.value.map((item) => {
                        if (item.value) {
                            let index = this.props.data.findIndex(x => x.value === item.value);
                            let res = this.props.data[index];
                            if (index > -1) {
                                dataOptions.splice(index, 1);
                            }
                            if (item) {
                                return res;
                            }
                        }
                        return null;
                    }).filter(item => item !== null);
                }
                this.setState({ selectedItem: selectedItems, data: dataOptions });
            } else if (this.props.value && this.props.value.value) {
                let index = this.props.data.findIndex(x => x.value === this.props.value.value);
                if (index !== -1) {
                    let item = this.props.data[index];
                    dataOptions.splice(index, 1);
                    this.setState({ selectedItem: item, data: dataOptions });
                }
            } else {
                this.setState({ selectedItem: {} });
            }
        }
    }

    handleChange(event) {
        let searchTerm = event.target.value;
        let options = searchTerm ? this.props.data.filter(category => category.label.toLowerCase().includes(searchTerm.toLowerCase())) : this.props.data;
        this.setState({ data: options, searchTerm: searchTerm });
    }

    handleClick() {
        this.setState({ data: this.state.data, optionExpand: true, focuzOptionIndex: 0 });
    }

    onItemSelect(item) {
        this.setState({ optionExpand: false, searchTerm: '' }, function () {
            if (this.props.handleOnChange) {
                this.props.handleOnChange(item);
            }
        });
    }

    handleKeyDown(event) {
        let optionIndex = this.state.focuzOptionIndex;
        if (this.state.data.length) {
            if (event.keyCode === 40) {
                optionIndex = optionIndex === this.state.data.length - 1 ? 0 : optionIndex + 1;
            } else if (event.keyCode === 38) {
                optionIndex = optionIndex === 0 ? this.state.data.length - 1 : optionIndex - 1;
            } else if (event.keyCode === 13) {
                let item = this.state.data[optionIndex];
                this.onItemSelect(item);
                document.getElementById('search-box').blur();
            }
        }
        this.setState({ focuzOptionIndex: optionIndex });
    }

    clearResults() {
        this.setState({ selectedItem: {}, optionExpand: false, searchTerm: '', data: this.props.data });
    }

    optionItemHover(index) {
        this.setState({ focuzOptionIndex: index });
    }

    handleRemoveClick(value) {
        if (this.state.isMultiSelect) {
            // TODO: Handle multi-select remove logic
        } else {
            this.setState({ data: this.props.data, optionExpand: false });
            this.props.handleOnChange({});
        }
    }

    render() {
        return (
            <div className="react-autocomplete-npm">
                <div className={'search-container'} ref={this.wrapperRef}>
                    <div className={'search-right-section'}>
                        {(this.state.selectedItem instanceof Array && this.state.isMultiSelect) &&
                            this.state.selectedItem.map((item, index) => (
                                <div className={'selected-item'} key={index}>
                                    <div className={'selected-item-label'}>{item.label}</div>
                                    <div className={'selected-item-cancel'} onClick={() => this.handleRemoveClick(item.value)}>X</div>
                                </div>
                            ))
                        }
                        {(!this.state.isMultiSelect && this.state.selectedItem.label) &&
                            <div className={'selected-item'}>
                                <div className={'selected-item-label'}>{this.state.selectedItem.label}</div>
                                <div className={'selected-item-cancel'} onClick={() => this.handleRemoveClick(this.state.selectedItem.value)}>X</div>
                            </div>
                        }
                        <input
                            value={this.state.searchTerm}
                            type="text"
                            onClick={this.handleClick}
                            onChange={this.handleChange}
                            placeholder={!this.state.selectedItem.label ? (this.props.placeholder || 'Search Items') : ''}
                            className={'search-box'}
                            onKeyDown={this.handleKeyDown}
                            id={"search-box"}
                        />
                        <div className={'selected-item-cancel'} onClick={this.clearResults}>X</div>
                    </div>
                    {this.state.optionExpand && (
                        <div id='list' className={'list show'}>
                            {this.state.data.length ? (
                                this.state.data.map((item, key) => (
                                    <option
                                        key={key}
                                        onMouseOver={() => this.optionItemHover(key)}
                                        className={this.state.focuzOptionIndex === key ? "highlight-option options" : "options"}
                                        onClick={() => this.onItemSelect(item)}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))
                            ) : (
                                <div className={'no-item-found'}><span>No items found</span></div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
