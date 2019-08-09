import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';

interface TemplateKeyRegisterState {
  templateId: string;
  keyValues: string[];
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
      keyValues: new Array<string>(this.ROWS_NUM).fill('')
    }
  }

  /**
   * Set the array assigned value to state
   * @param event Form input event
   */
  onKeyChange(event: InputEvent) {
    const val = event.target.value;
    const tmpVals = this.state.keyValues;
    tmpVals[event.target.id] = val;
    this.setState({ keyValues: tmpVals })
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
              onChange={(e: InputEvent) => {this.onKeyChange(e)}}
              placeholder="キー名を入力"></input>
          </div>
          <label>
            <input key={i} type="checkbox" name="1RowBelow" className="input-checkbox"></input>
            <span className="input-checkbox-label">一行下を取得</span>
          </label>
        </div>
      );
      form.push(row);
    }
    return form;
  }

  submit() {
    console.log(this.state.keyValues)
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