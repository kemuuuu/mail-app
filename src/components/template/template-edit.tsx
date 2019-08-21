import * as React from 'react';
import { postData, getData } from '../../utils/fetch-utils';
import { RouteComponentProps } from 'react-router-dom';

interface TemplateEditState {
  templateId: string;
  templateName: string;
  templateAddress: string;
}

interface TemplateEditProps {
  seletedTemplateId: string;
  backList: () => void;
}

interface InputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

export class TemplateEdit extends React.Component<TemplateEditProps, TemplateEditState> {

  constructor(props: TemplateEditProps) {
    super(props);
    this.state = {
      templateId: props.seletedTemplateId,
      templateName: 'テンプレート名',
      templateAddress: '送信元アドレス'
    }
  }

  componentWillMount() {

    // Skip if template ID is not set for this.
    if (!this.state.templateId) return;

    // Create URL_OBJECT
    const host = document.baseURI;
    const url = '/api/v1/template/findone';
    const url_obj = new URL(url, host);
    const url_params = new URLSearchParams;
    // Include template_id in query
    url_params.append('id', this.state.templateId);
    url_obj.search = url_params.toString();

    // Exec fetch(GET)
    getData(url_obj.toString())
      .then((data) => {
        this.setState({
          templateName: data.result.name,
          templateAddress: data.result.address
        })
      })
      .catch(err => { 
        // ---TODO--- replace log4js
        console.error(err)
      });
  }

  nameChanged(event:InputEvent) {
    this.setState({
      templateName: event.target.value
    });
  }

  mailChanged(event:InputEvent) {
    this.setState({
      templateAddress: event.target.value
    });
  }

  submit() {
    const url = '/api/v1/template/edit';
    postData(url, this.state)
      .then(() => this.props.backList())
      .catch(error => console.error(error));
  }
  
  render() {
    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">メールテンプレート編集</h1>
        </div>
        <div className="template-create-wrapper">
          <div className="template-create-content">
            <label className="template-create-label">テンプレート名</label>
            <div className="template-create-input">
              <input type="text" name="templateName" value={this.state.templateName} className="input-text" onChange={(e) => this.nameChanged(e)}></input>
            </div>
            <label className="template-create-label">送信元アドレス</label>
            <div className="template-create-input">
              <input type="text" name="templateAddress" value={this.state.templateAddress} className="input-text" onChange={(e) => this.mailChanged(e)}></input>
            </div>
            <div>
              <a className="btn-border pointer" onClick={() => this.submit()}>保存</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}