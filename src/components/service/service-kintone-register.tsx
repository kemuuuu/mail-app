import * as React from 'react';
import { postData } from '../../utils/fetch-utils';

interface ServiceKintoneRegisterState {
  domain: string;
  loginName: string;
  password: string;
  type: string;
}
interface ServiceKintoneRegisterProps {}

interface InputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

export class ServiceKintoneRegister extends React.Component<ServiceKintoneRegisterProps, ServiceKintoneRegisterState> {

  constructor(props: ServiceKintoneRegisterProps) {
    super(props);
    this.state = {
      domain: '',
      loginName: '',
      password: '',
      type: 'kintone'
    }
  }

  onInputChange(event: InputEvent) {
    const val = event.target.value;
    const name = event.target.name;
    const curSta = Object.assign({}, this.state);
    curSta[name] = val;
    this.setState(curSta);
  }

  submit() {
    const url = '/api/v1/kintone/auth/create';
    postData(url, this.state)
      .then(() => location.href='/setting/service/kintone')
      .catch(error => console.error(error));
  }

  render() {
    return(
      <div className="kintone-connect-form">
        <h2>認証情報入力</h2>
        <label className="template-create-label">サブドメイン</label>
        <div className="template-create-input">
          <input type="text" name="domain" className="input-text" placeholder="サブドメインを入力してください" onChange={(e) => this.onInputChange(e)}></input>
        </div>
        <label className="template-create-label">ログイン名</label>
        <div className="template-create-input">
          <input type="text" name="loginName" className="input-text" placeholder="ユーザ名を入力してください" onChange={(e) => this.onInputChange(e)}></input>
        </div>
        <label className="template-create-label">パスワード</label>
        <div className="template-create-input">
          <input type="password" name="password" className="input-text" placeholder="パスワードを入力してください" onChange={(e) => this.onInputChange(e)}></input>
        </div>
        <div>
          <a className="btn-border pointer" onClick={() => {this.submit()}}>認証情報作成</a>
        </div>
      </div>
    );
  }
}