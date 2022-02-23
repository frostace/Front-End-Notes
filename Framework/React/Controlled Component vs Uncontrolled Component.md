#Controlled Component vs Uncontrolled Component 

Who is `Controlling` the component? -- React

React components where mutable states are kept as the `single source of truth` to control over element values (e.g. HTML input form element value)

## Controlled Component

```jsx
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      	this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
		
  	// the value attribute will override the value in the DOM
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```

**This flow kind of ‘pushes’ the value changes to the form component**

Controlled Component can respond to input changes immediately:

- in-place feedback, like validations
- [disabling the button unless all fields have valid data](https://goshakkk.name/form-recipe-disable-submit-button-react/)
- enforcing a specific input format, like credit card numbers

## Uncontrolled Component

Element value (e.g. form data is handled by the DOM itself)

```jsx
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef(); // to access value from react, use a ref
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.input.current.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```

**You have to ‘pull’ the value from the field when you need it**

## Recommendation for usage

| feature                                                      | uncontrolled | controlled |
| ------------------------------------------------------------ | ------------ | ---------- |
| one-time value retrieval (e.g. on submit)                    | ✅            | ✅          |
| [validating on submit](https://goshakkk.name/submit-time-validation-react/) | ✅            | ✅          |
| [instant field validation](https://goshakkk.name/instant-form-fields-validation-react/) | ❌            | ✅          |
| [conditionally disabling submit button](https://goshakkk.name/form-recipe-disable-submit-button-react/) | ❌            | ✅          |
| enforcing input format                                       | ❌            | ✅          |
| several inputs for one piece of data                         | ❌            | ✅          |
| [dynamic inputs](https://goshakkk.name/array-form-inputs/)   | ❌            | ✅          |

