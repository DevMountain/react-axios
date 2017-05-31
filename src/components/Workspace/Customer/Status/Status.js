import React, { Component } from 'react';
import './Status.css';

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      editting: false
    }

    this.handleChange = this.handleChange.bind( this );
    this.toggle = this.toggle.bind( this );
    this.save = this.save.bind( this );
  }

  handleChange( event ) {
    this.setState({ status: event.target.value });
  }

  toggle() {
    this.setState({ editting: !this.state.editting, status: this.props.status });
  }

  save( id ) {
    this.setState({ editting: !this.state.editting });
  }

  render() {
    const { id } = this.props;
    const { editting } = this.state;

    return (
      <div id="CustomerStatus__container">
        <h5> Customer Status </h5>
        <input id="CustomerStatus__input" disabled={ !editting } onChange={ this.handleChange } value={ this.state.status } />
        {
          editting
          ?
            <div style={ { display: 'inline'} }>
              <button id="CustomerStatus__editBtn" onClick={ this.toggle }> X </button>
              <button id="CustomerStatus__saveBtn" onClick={ () => this.save( id ) }> Save </button>
            </div>
          :
            <button id="CustomerStatus__editBtn" onClick={ this.toggle }> Edit </button>
        }
      </div>
    )
  }
}