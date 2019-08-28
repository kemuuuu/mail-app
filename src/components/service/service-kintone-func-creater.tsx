import * as React from 'react';
import { getData, postData, generateGetUrlObj } from '../../utils/fetch-utils';
import { Template, TemplateKey, KintoneApp, KintoneProperty, KintoneField } from '../../mailconnect';
import { SelectBoxCreater } from '../../utils/html-utils';

interface ServiceKintoneFuncCreaterState {
  functionName: string;
  templates: Template[] | null;
  apps: KintoneApp[] | null;
  loaded: boolean;
  selectedTemplateId: string | null;
  selectedApp: KintoneApp | null;
  keys: TemplateKey[] | null;
  kintoneProperties: KintoneProperty[] | null;  // Kintoneから取得した生の項目情報
  kintoneFields: KintoneField[] | null; // 選択したkintonefieldとtemplate_keyのマッピング(DB保存形式)
}

interface ServiceKintoneFuncCreaterProps {
  createCancel: () => void;
}

interface InputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

export class ServiceKintoneFuncCreater extends React.Component<ServiceKintoneFuncCreaterProps, ServiceKintoneFuncCreaterState> {

  constructor(props) {
    super(props);
    this.state = { 
      functionName: '',
      templates: null,
      apps: null,
      loaded: false,
      selectedTemplateId: null,
      selectedApp: null,
      keys: null,
      kintoneProperties: null,
      kintoneFields: null
    };
    // binding
    this.onChangeTemplate = this.onChangeTemplate.bind(this);
    this.onChangeApp = this.onChangeApp.bind(this);
  }

  componentWillMount() {
    this.getTemplates();
    this.getKintoneApps();
  }

  /**
   * 接続KINTONEのアプリ一覧を取得
   */
  getKintoneApps() {
    // Create URL_OBJECT
    const type = 'kintone';
    const params = { type: type };
    const path = '/api/v1/kintone/getapps';
    const host = document.baseURI;
    const url = generateGetUrlObj(host, path, params);
    getData(url)
    .then((data) => {
      if (data.result.apps) {
        // parse result
        const apps = data.result.apps.map(e => {
          if (e.spaceId !== null) {
            const tmp: KintoneApp = {
              id: e.appId,
              appId: e.appId,
              name: e.name,
              spaceId: e.spaceId,
              threadId: e.threadId
            }
            return tmp;
          }
        });
        this.setState({ apps: apps, loaded: true });
      }
    })
    .catch(err => { 
      console.error(err);
    });
  }

  /**
   * 選択済みアプリの項目一覧を取得
  */
  getKintoneAppFields(selectedApp) {
    if (!selectedApp) return;

    // Create URL_OBJECT
    const params = {
      appId: selectedApp.id,
      spaceId: selectedApp.spaceId
    };
    const path = '/api/v1/kintone/getfields';
    const host = document.baseURI;
    const url = generateGetUrlObj(host, path, params);
    getData(url)
    .then((data) => {
      const result = data.result.properties;
      if (result) {
        
        const properties = Object.keys(result).map((e) => {
          if (result[e].label !== null && result[e].label !== '') {
            const tmp: KintoneProperty = {
              id: result[e].id,
              code: result[e].code,
              expression: result[e].expression,
              hideExpression: result[e].hideExpression,
              name: result[e].label,
              label: result[e].label,
              maxLength: result[e].maxLength,
              minLength: result[e].minLength,
              noLabel: result[e].noLabel,
              required: result[e].required,
              type: result[e].type,
              unique: result[e].unique
            };
            return tmp;
          }
        });
        this.setState({ kintoneProperties: properties });
      }
    })
    .catch(err => { 
      console.error(err);
    });
  }

  /**
   * 作成済みテンプレートを取得
   */
  getTemplates() {
    const url = '/api/v1/template/findall';
    getData(url)
      .then(data => this.setState({templates: data.result}))
      .catch(err => console.error(err));
  }

  /**
   * 選択テンプレート変更時
   */
  onChangeTemplate(e) {
    this.setState({ selectedTemplateId: e.target.value });
    this.loadTemplateKeys(e.target.value);
  }

  nameChanged(e: InputEvent) {
    this.setState({
      functionName: e.target.value
    });
  }

  /**
   * 選択アプリ変更時
   */
  onChangeApp(e) {
    if (e.target.value === "-") return;
    const selectedAppId = e.target.value;
    const selectedApp = this.state.apps.find((app) => app.appId === selectedAppId);
    this.setState({ selectedApp: selectedApp });
    this.getKintoneAppFields(selectedApp);
  }

  /**
   * 選択したテンプレートのキー一覧を取得
   */
  loadTemplateKeys(selectedTemplateId) {
    // Skip if template ID is not set for this.
    if (!selectedTemplateId) return;

    // Create URL_OBJECT
    const host = document.baseURI;
    const url = '/api/v1/template/findkeys';
    const url_obj = new URL(url, host);
    const url_params = new URLSearchParams;
    // Include template_id in query
    url_params.append('id', selectedTemplateId);
    url_obj.search = url_params.toString();

    // Exec fetch(GET)
    getData(url_obj.toString())
    .then((data) => {
      const keys = data.result.template_keys;
      if (keys<1) return;
      else {
        this.setState({ keys: keys })
      }
    })
    .catch(err => { 
      console.error(err)
    });
  }

  /**
   * Kintone項目が選択されたときのアクション
   */
  onKintoneFieldsSelected(template_key_id, field_code, field_label) {
    // Kintone field作成
    const kintoneField: KintoneField = {
      label: field_label,
      field_code: field_code,
      template_key_id: template_key_id
    };
    // stateにセット
    let tmpFields;
    if (this.state.kintoneFields) {
      tmpFields = Object.create(this.state.kintoneFields);
    } else {
      tmpFields = [];
    }
    tmpFields.push(kintoneField);
    this.setState({
      kintoneFields: tmpFields
    });
  }

  /**
   * 選択テンプレートのキーリストを作成
   */
  keysListCreater() {
    if (!this.state.keys) return <tbody></tbody>;

    const keys = this.state.keys.map((e,i) => {
      if (e.key !== '') {
        return (
          <tr key={e.id}>
            <td key={e.id}>
              <label>{e.key}</label>
            </td>
            <td>
              {/* CREATE KINTONE FIELD SELECT BOX */}
              {(() => {
                if (this.state.kintoneProperties) {
                  const properties = this.state.kintoneProperties;
                  const options = properties.map((pro) => {
                    if (e) {
                      return (<option id={pro.label} key={pro.label} value={pro.code}>{pro.name}</option>);
                    }
                  });
                  options.unshift(<option key="-" value="-">-</option>);
                  return (
                    <div className="cp_ipselect cp_sl01">
                      <select defaultValue="-" onChange={(event) => this.onKintoneFieldsSelected(e.id, event.target.value, event.target.id)}> {options} </select>
                    </div>
                  );
                }
              })()}
            </td>
          </tr>
        );
      }
    })
    return(
      <tbody>{keys}</tbody>
    );
  }

  /**
   * Function 作成
   */
  submit() {
    const url = '/api/v1/kintone-function/create';
    const params = {
      name: this.state.functionName,
      selectedTemplateId: this.state.selectedTemplateId,
      selectedAppId: this.state.selectedApp.id,
      selectedAppSpaceId: this.state.selectedApp.spaceId,
      kintoneFields: this.state.kintoneFields
    };
    postData(url, params)
    .then((result) => { console.log(result) })
  }

  render() {
    const keysList = this.keysListCreater();
    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">kintone連携ファンクション作成</h1>
        </div>
        <div className="service-kintone-wrapper">
          <div className="service-kintone-content">
            {(() => {
                if (this.state.loaded) {
                  return (
                    <div>
                      <div>
                        <label className="function-create-label">ファンクション名</label>
                        <div className="function-input-box">
                          <input type="text" name="functionName" className="input-text__function" onChange={(e: InputEvent) => this.nameChanged(e)} placeholder="ファンクション名を入力してください"></input>
                        </div>
                      </div>
                      <div>
                        <label className="function-create-label">テンプレート名</label>
                        <SelectBoxCreater trg={this.state.templates} onSelectChange={this.onChangeTemplate} />
                      </div>
                      <div>
                        <label className="function-create-label">接続アプリ名</label>
                        <SelectBoxCreater trg={this.state.apps} onSelectChange={this.onChangeApp} />
                      </div>
                      <div className="func-create-box">
                        <table>
                          <thead>
                            <tr>
                              <th>テンプレート項目</th>
                              <th>連携アプリ項目</th>
                            </tr>
                          </thead>
                          {keysList}
                        </table>
                      </div>
                      <div>
                        <a className="btn-border pointer" onClick={() => this.submit()}>作成</a>
                      </div>
                      <div>
                        <a className="btn-link pointer" onClick={() => this.props.createCancel()}>キャンセル</a>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="notloaded"><div className="loader"></div></div>
                  );
                }
              })()}
          </div>
        </div>
      </div>
    );
  }

}