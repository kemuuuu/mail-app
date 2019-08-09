import * as React from 'react'
import { postData, getData } from '../../utils/fetch-utils';
import { RouteComponentProps } from 'react-router-dom';
import { TemplateKey } from '../../mailconnect';

interface TemplateKeyRegisterState {
  templateId: string;
  keys: TemplateKey[];
}

interface TemplateKeyRegisterProps extends RouteComponentProps<{id: string}> {}

interface InputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

export class TemplateKeyRegister extends React.Component<TemplateKeyRegisterProps, TemplateKeyRegisterState> {

  // Number of display lines
  ROWS_NUM: number = 12;

  constructor(props: TemplateKeyRegisterProps) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      templateId: params.id,
      keys: this.createEmptyKey(params.id)
    }
  }

  /**
   * Get keys that a template has
   */
  componentWillMount() {
    // Skip if template ID is not set for this.
    if (!this.state.templateId) return;

    // Create URL_OBJECT
    const host = document.baseURI;
    const url = '/api/v1/template/findkeys';
    const url_obj = new URL(url, host);
    const url_params = new URLSearchParams;
    // Include template_id in query
    url_params.append('id', this.state.templateId);
    url_obj.search = url_params.toString();

    // Exec fetch(GET)
    getData(url_obj.toString())
      .then((data) => {
        const keys = data.result.template_keys;
        if (keys<1) return;
        else {
          this.setState({ keys: keys})
        }
      })
      .catch(err => { 
        console.error(err)
      });
  }

  /**
   * Create empty key-records for initialize.
   * @param templateId Target template id
   */
  createEmptyKey(templateId: string) {
    const tmpKeys = [];
    for (let i = 0; i < this.ROWS_NUM; i++) {
      const tmp: TemplateKey = {
        id: '',
        template_id: templateId,
        key: '',
        sort_number: i,
        a_row_below: false
      }
      tmpKeys.push(tmp);
    }
    return tmpKeys;
  }

  /**
   * Set the array assigned value to state
   * @param event Form input event
   */
  onKeyChange(event: InputEvent) {
    const val = event.target.value;
    const tmpKeys = this.state.keys;
    tmpKeys[event.target.id].key = val;
    this.setState({ keys: tmpKeys });
  }

  /**
   * Set the array assigned boolean value to state
   * @param event Form input event
  */
  onCheckChange(event: InputEvent) {
    const val = event.target.checked;
    const tmpKeys = this.state.keys;
    if (event.target.name === 'aRowBelow') {
      tmpKeys[event.target.id].a_row_below = val;
    }
  }

  /**
   * Create {this.ROWS_NUM} input form(s).
   */
  createInputForm() {
    const form = [];
    for (let i = 0; i < this.ROWS_NUM; i++) {
      const row = (
        <div className="template-key-row" key={i}>
          <label className="template-key-label">{i+1}.</label>
          <div className="template-key-input">
            <input 
              id={String(i)}
              type="text" 
              name="templateName" 
              className="input-text-key" 
              value={this.state.keys[i].key}
              onChange={ (e: InputEvent) => {this.onKeyChange(e)} }
              placeholder="キー名を入力"></input>
          </div>
          <label>
            <input
              id={String(i)} 
              key={i} 
              type="checkbox" 
              name="aRowBelow" 
              className="input-checkbox"
              checked={this.state.keys[i].a_row_below}
              onChange={ (e: InputEvent) => {this.onCheckChange(e)} }></input>
            <span className="input-checkbox-label">一行下を取得</span>
          </label>
        </div>
      );
      form.push(row);
    }
    return form;
  }

  /**
   * Save the result of edit
   */
  submit() {
    const url = '/api/v1/template-key/regist';
    postData(url, this.state)
      .then(() => location.href='/setting/template/list')
      .catch(error => console.error(error));
  }

  render() {

    const inputForm = this.createInputForm();

    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">キー項目登録</h1>
        </div>
        <div className="template-key-wrapper">
          <div className="template-key-content">
            { inputForm }
            <div>
              <a className="btn-border pointer" onClick={() => this.submit()}>作成</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}