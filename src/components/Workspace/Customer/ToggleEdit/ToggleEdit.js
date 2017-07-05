import React, { Component } from 'react';
import './ToggleEdit.css';

export default class ToggleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.val,
      editing: false
    }

    this.handleChange = this.handleChange.bind( this );
    this.toggle = this.toggle.bind( this );
    this.save = this.save.bind( this );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.val !== this.state.val) {
      this.setState({
        val: nextProps.val
      })
    }
  }

  handleChange(event) {
    this.setState({ val: event.target.value });
  }

  toggle() {
    this.setState({ editing: !this.state.editing, val: this.props.readOnlyVal })
  }

  save() {
    this.props.saveEdit(this.props.id, {[this.props.property]: this.state.val});
    this.setState({
      editing: false
    });
  }

  render() {
    var { description, multi } = this.props;
    var { editing, val } = this.state;

    return (
      <div className="CustomerToggleEdit__container">
        {
          multi
          ?
            <textarea className="CustomerToggleEdit__textarea" disabled={ !editing } value={ val } onChange={ this.handleChange } />
          :
            <input className="CustomerToggleEdit__input" disabled={ !editing } placeholder={ description } value={ val } onChange={ this.handleChange } />
        }
        {
          editing
          ?
            multi
            ?
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle } style={ { position: 'relative', top: '-20px' } }> X </button>
            :
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle }> X </button>
          :
            multi
            ?
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle } style={ { position: 'relative', top: '-20px' } }>Edit</button>
            :
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle }>Edit</button>
        }
        {
          editing
          ?
            multi
            ?
              <button className="CustomerToggleEdit__saveBtn" onClick={ this.save } style={ { position: 'relative', top: '-20px' } }>Save</button>
            :
              <button className="CustomerToggleEdit__saveBtn" onClick={ this.save }>Save</button>
          :
            null
        }
      </div>
    )
  }
}
