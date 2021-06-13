"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireDefault(require("react"));

require("./styles/style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Multiselect extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "watchForChange", () => {
      if (this.props.data) {
        this.setState({
          data: this.props.data
        });

        if (this.props.value) {
          let index = this.props.data.findIndex(x => x.value === this.props.value);

          if (index !== -1) {
            let item = this.props.data[index];
            this.onItemSelect(item);
          }
        }
      }
    });

    _defineProperty(this, "handleChange", event => {
      let searchTerm = event.target.value;
      let options = [];

      if (searchTerm) {
        options = this.props.data.filter(category => category.label.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        options = this.props.data;
      }

      this.setState({
        data: options,
        searchTerm: searchTerm
      });
    });

    _defineProperty(this, "handleClick", () => {
      this.setState({
        optionExpand: true,
        focuzOptionIndex: 0
      });
    });

    _defineProperty(this, "onItemSelect", item => {
      let selectedItem = {};

      if (item) {
        selectedItem = item;
      }

      this.setState({
        selectedItem: selectedItem,
        optionExpand: false,
        searchTerm: ''
      }, function () {
        if (this.props.handleOnChange) {
          this.props.handleOnChange(item);
        }
      });
    });

    _defineProperty(this, "handleKeyDown", event => {
      let optionIndex = this.state.focuzOptionIndex;

      if (this.state.data.length) {
        if (event.keyCode === 40) {
          if (optionIndex === this.state.data.length - 1) {
            // Last item
            optionIndex = 0;
          } else {
            optionIndex = optionIndex + 1;
          }
        } else if (event.keyCode === 38) {
          if (optionIndex === 0) {
            // First item
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
        focuzOptionIndex: optionIndex
      });
    });

    this.state = {
      data: this.props.data,
      optionExpand: false,
      selectedItem: {},
      selectedItemLabel: '',
      focuzOptionIndex: 0,
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.wrapperRef = /*#__PURE__*/_react.default.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.watchForChange = this.watchForChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.watchForChange();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value || JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.watchForChange();
    }
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        optionExpand: false
      });
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "App"
    }, /*#__PURE__*/_react.default.createElement("p", null, "Dynamic search box"), /*#__PURE__*/_react.default.createElement("div", {
      className: 'search-container',
      ref: this.wrapperRef
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: 'search-right-section'
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: 'selected-item'
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: 'selected-item-label'
    }, this.state.selectedItem.label), /*#__PURE__*/_react.default.createElement("div", {
      className: 'selected-item-cancel'
    })), /*#__PURE__*/_react.default.createElement("input", {
      value: this.state.searchTerm,
      type: "text",
      onClick: this.handleClick,
      onChange: this.handleChange,
      placeholder: this.props.placeholder ? this.props.placeholder : 'Search Items',
      className: 'search-box',
      onKeyDown: this.handleKeyDown,
      id: "search-box"
    }), /*#__PURE__*/_react.default.createElement("button", {
      class: "close-icon",
      type: "reset"
    })), this.state.optionExpand && /*#__PURE__*/_react.default.createElement("div", {
      id: "list",
      className: 'list'
    }, this.state.data && this.state.data.length ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.state.data.map((item, key) => /*#__PURE__*/_react.default.createElement("option", {
      className: this.state.focuzOptionIndex == key ? "highlight-option options" : "options",
      id: key,
      onClick: () => this.onItemSelect(item),
      value: item.value
    }, item.label))) : /*#__PURE__*/_react.default.createElement("div", {
      className: 'no-item-found'
    }, /*#__PURE__*/_react.default.createElement("span", null, "No items found")))));
  }

}

exports.default = Multiselect;
