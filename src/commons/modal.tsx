import * as React from 'react'

interface ModalProps {
  isShow: boolean;
  onclick: () => void;
  onclose: () => void;
  title: string;
  body: string;
  actionName: string;
  model: string;
  record_id: string;
}

interface ModalState {
  isShow: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
  
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="modal_wrap">
        <input checked={this.props.isShow} id="trigger" type="checkbox" onChange={() => {}}></input>
        <div className="modal_overlay">
          <label className="modal_trigger"></label>
          <div className="modal_content">
            <label className="close_button" onClick={() => this.props.onclose()}>✖️</label>
            <h2 className="modal_title">{this.props.title}</h2>
            <p className="modal_body">{this.props.body}</p>
            <a className="btn-border__alert pointer" onClick={() => this.props.onclick()}>{this.props.actionName}</a>
          </div>
        </div>
      </div>
    );
  }
}