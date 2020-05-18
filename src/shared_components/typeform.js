import React, { Component } from 'react';

class TypeformButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
          <button style = {{fontWeight: 'bold', textAlign: 'left', marginLeft: 39, marginTop: 30, border: 'solid 1px #5ec3eb', color: '#5ec3eb', borderRadius: 5, padding: '5px 10px', background: 'rgba(94, 195, 235, 0.25)', width: 175}}>
            <span style = {{border: 'solid 1px #5ec3eb', fontSize: 10, borderRadius: 2, background: '#edf6fa', padding: '4px 8px', fontWeight: 'bold', marginRight: 10, position: 'relative', bottom: 2}}>
              {this.props.buttonLabel}
            </span>
            {this.props.buttonText}
          </button><br/>
      </div>
    )
  }
}

export default TypeformButton
