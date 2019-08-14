import * as React from 'react';
import { getData, generateGetUrlObj } from '../../utils/fetch-utils';
import { Template, TemplateKey, KintoneApp, KintoneProperty } from '../../mailconnect';
import { SelectBoxCreater } from '../../utils/html-utils';

interface ServiceKintoneFuncCreaterState {
  templates: Template[] | null;
  apps: KintoneApp[] | null;
  loaded: boolean;
  selectedTemplateId: string | null;
  selectedApp: KintoneApp | null;
  keys: TemplateKey[] | null;
  kintoneProperties: KintoneProperty[] | null;
}

interface ServiceKintoneFuncCreaterProps {}

export class ServiceKintoneFuncCreater extends React.Component<ServiceKintoneFuncCreaterProps, ServiceKintoneFuncCreaterState> {

  constructor(props) {
    super(props);
    this.state = { 
      templates: null,
      apps: null,
      loaded: false,
      selectedTemplateId: null,
      selectedApp: null,
      keys: null,
      kintoneProperties: null
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
              {(() => {
                if (this.state.kintoneProperties) {
                  return <SelectBoxCreater trg={this.state.kintoneProperties} onSelectChange={() => {}} />;
                }
              })()}
            </td>
          </tr>
        );
      }
    })
    return(
      <tbody> {keys} </tbody>
    );
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
                          { keysList }
                        </table>
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