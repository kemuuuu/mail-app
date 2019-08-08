import * as React from 'react';
import { postData } from '../../utils/fetch-utils'

interface TemplateCreateState {
  templateName: string;
  templateAddress: string;
}
interface TemplateCreateProps {}

interface InputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}


export class TemplateCreate extends React.Component<TemplateCreateProps, TemplateCreateState> {

  constructor(props: TemplateCreateProps) {
    super(props);
    this.state = {
      templateName: '',
      templateAddress: ''
    }
  }

  nameChanged(event:InputEvent) {
    this.setState({
      templateName: event.target.value
    })
  }

  mailChanged(event:InputEvent) {
    this.setState({
      templateAddress: event.target.value
    })
  }

  submit() {
    const url = '/api/v1/template/create';
    postData(url, this.state)
      .then(() => location.href='/setting/template/list')
      .catch(error => console.error(error));
  }
  
  render() {
    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">新規メールテンプレート作成</h1>
        </div>
        <div className="template-create-wrapper">
          <div className="template-create-content">
            <label className="template-create-label">テンプレート名</label>
            <div className="template-create-input">
              <input type="text" name="templateName" className="input-text" onChange={(e) => this.nameChanged(e)}></input>
            </div>
            <label className="template-create-label">送信元アドレス</label>
            <div className="template-create-input">
              <input type="text" name="templateAddress" className="input-text" onChange={(e) => this.mailChanged(e)}></input>
            </div>
            <div>
              <a className="btn-border pointer" onClick={() => this.submit()}>作成</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}