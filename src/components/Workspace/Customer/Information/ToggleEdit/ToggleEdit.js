import React, { Component } from 'react';
import './ToggleEdit.css';

export default class ToggleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.val,
      editting: false
    }

    this.handleChange = this.handleChange.bind( this );
    this.toggle = this.toggle.bind( this );
    this.save = this.save.bind( this );
  }

  handleChange(event) {
    this.setState({ val: event.target.value });
  }

  toggle() {
    this.setState({ editting: !this.state.editting, val: this.props.readOnlyVal })
  }

  save() {
    this.setState({ editting: !this.state.editting });
  }

  render() {
    const { description } = this.props;
    const { editting, val } = this.state;

    return (
      <div className="CustomerToggleEdit__container">
        <input className="CustomerToggleEdit__input" disabled={ !editting } placeholder={ description } value={ val } onChange={ this.handleChange } />  
        {
          editting
          ?
            <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle }> X </button>
          :
            <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle }>Edit</button>
        }
        {
          editting
          ?
            <button className="CustomerToggleEdit__saveBtn" onClick={ this.save }>Save</button>
          :
            null
        }
      </div>
    )
  }
}