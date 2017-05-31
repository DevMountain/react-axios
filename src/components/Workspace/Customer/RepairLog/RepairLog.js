import React, { Component } from "react";
import { dispatchUpdateCustomer } from '../../../../services/workspaceService';
import './RepairLog.css';

export default class RepairLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: this.props.log,
      editting: false
    };

    this.handleChange = this.handleChange.bind( this );
    this.toggle = this.toggle.bind( this );
    this.save = this.save.bind( this );
  }

  handleChange( event ) {
    this.setState({ log: event.target.value })
  }

  toggle() {
    this.setState({ editting: !this.state.editting });
  }

  save() {
    dispatchUpdateCustomer( this.props.id, { log: this.state.log } );
    this.setState({ editting: !this.state.editting });
  }

  render() {
    const { editting } = this.state;
    return (
      <div id="CustomerRepairLog__container">
        <h5> Repair Log </h5>
        <textarea id="CustomerRepairLog__log" disabled={ !editting } value={ this.state.log } onChange={ this.handleChange } />
        {
          editting
          ?
            <div style={ { display: 'inline' } }>
              <button id="CustomerRepairLog__editBtn" onClick={ this.toggle }> X </button>
              <button id="CustomerRepairLog__saveBtn" onClick={ this.save }> Save </button>
            </div>
          :
            <button id="CustomerRepairLog__editBtn" onClick={ this.toggle }> Edit </button>
        }
      </div>
    )
  }

}

//        <button onClick={ () => dispatchUpdateLog( id, this.state.log ) }> Update Log </button>
//        <button onClick={ () => { this.setState({ log }) } }> Reset Changes </button>