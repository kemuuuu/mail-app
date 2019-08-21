import * as React from 'react';
import { postData } from '../../utils/fetch-utils';

interface TemplateCreateState {
  templateName: string;
  templateAddress: string;
}
interface TemplateCreateProps {
  backList: () => void
}

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
      .then(() => this.props.backList())
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
              <input type="text" name="templateName" className="input-text" onChange={(e) => this.nameChanged(e)} placeholder="テンプレート名を入力してください"></input>
            </div>
            <label className="template-create-label">送信元アドレス</label>
            <div className="template-create-input">
              <input type="text" name="templateAddress" className="input-text" onChange={(e) => this.mailChanged(e)} placeholder="送信元アドレスを入力してください"></input>
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