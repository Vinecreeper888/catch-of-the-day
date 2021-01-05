import React from 'react';
import {getFunName} from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
    myInput = React.createRef();

    // handleSubmit is a property here just like myInput
    // set it to an arrow function that allows us to bind

    handleSubmit = event => {
        event.preventDefault();
        //console.log(this.myInput.value.value);
        const storeName = this.myInput.current.value;
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        return(
            <form className="store-selector" onSubmit={this.handleSubmit}>
                <h2>Please enter A Store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()}
                />
                <button type="submit">
                    Visit Store!
                </button>
            </form>
        );
    }
}

export default StorePicker;