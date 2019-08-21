import * as React from 'react';
import { getData, postData } from '../../utils/fetch-utils';
import { Template } from '../../mailconnect';
import { Modal } from '../../commons/modal';

interface TemplateListState {
  templates: Template[];
}

interface TemplateListProps {
  showModal: boolean;
  selectedTemplateId: string;
  onCreateClick: () => void;
  onEditClick: (e: OnClickEvent) => void;
  onRegisterClick: (e: OnClickEvent) => void;
  onDeleteClick: (e: OnClickEvent) => void;
  onModalClose: () => void;
  backList: () => void;
}

interface OnClickEvent extends React.MouseEvent<HTMLAnchorElement> {
  target: HTMLAnchorElement
}

export class TemplateList extends React.Component<TemplateListProps, TemplateListState> {

  constructor(props) {
    super(props);
    this.state = {
      templates: []
    };
  }

  /**
   * Get template for list.
   */
  componentWillMount() {
    const url = '/api/v1/template/findall';
    getData(url)
      .then(data => this.setState({templates: data.result}))
      .catch(err => console.error(err));
  }

  /**
   * template 削除
   */
  templateDelete() {
    const url = '/api/v1/template/delete';
    postData(url, {id: this.props.selectedTemplateId})
      .then(() => location.reload())
      .catch(error => console.error(error));
  }
  
  /**
   * Template 一覧コンポーネント作成
   */
  createTemplateList(): JSX.Element[] {

    if (this.state.templates.length < 1) return;

    const templateList = this.state.templates.map(e => {
      return (
        <tr className="datarow" key={e.id}>
          <td>{e.name}</td>
          <td>{e.address}</td>
          <td>
            <a className="pointer icon-button" id={e.id} onClick={(e: OnClickEvent) => this.props.onRegisterClick(e)}>
              <img id={e.id} src="./images/icon__key.png" alt="regist" height="20px" width="auto"/>
              <span id={e.id} className="tooltip"><span id={e.id} className="text">キー登録</span></span>
            </a>
          </td>
          <td>
            <a className="pointer icon-button" id={e.id} onClick={(e: OnClickEvent) => this.props.onEditClick(e)}>
              <img id={e.id} src="./images/icon__edit.png" alt="edit" height="20px" width="auto"/>
              <span id={e.id} className="tooltip"><span id={e.id} className="text">テンプレート編集</span></span>
            </a>
          </td>
          <td>
            <a className="pointer icon-button" id={e.id} onClick={(e: OnClickEvent) => this.props.onDeleteClick(e)}>
              <img id={e.id} src="./images/icon__delete.png" alt="delete" height="20px" width="auto"/>
              <span id={e.id} className="tooltip"><span id={e.id} className="text">テンプレート削除</span></span>
            </a>
          </td>
        </tr>
      );
    });
    return templateList;
  }

  render() {

    const templateList = this.createTemplateList();
    // 全テンプレート数
    const rows = this.state.templates.length;
    // 表示中テンプレート数
    const curRows = this.state.templates.length;

    return(
      <div>

        <Modal
          isShow={this.props.showModal}
          onclick={() => this.templateDelete()}
          onclose={() => this.props.onModalClose()}
          title="テンプレート削除"
          body="削除しますか？"
          actionName="削除"
          model="template"
          record_id={this.props.selectedTemplateId} />

        <div className="template-list-heading">
          <h1 className="template-list-heading-title">メールテンプレート一覧</h1>
          <a onClick={() => this.props.onCreateClick()} className="btn-border--create pointer">新規メールテンプレート作成</a>
        </div>
        <div className="template-list-wrapper">
          <div className="template-list-search-box">
            <input type="text" className="input-text input-search" placeholder="テンプレート名,メールアドレスで検索"></input>
            <a><img className="icon-search pointer" src="./images/icon__search.png" alt="edit" height="40px" width="auto"/></a>
          </div>
          <div className="template-list-content">
            <table>
              <thead>
                <tr>
                  <th>
                    テンプレート名
                  </th>
                  <th>
                    メールアドレス
                  </th>
                  <th>
                    {/* 操作 */}
                  </th>
                  <th>
                    {/* 操作 */}
                  </th>
                  <th>
                    {/* 操作 */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {templateList}
              </tbody>
            </table>
            <div className="table-footer">
              全{rows}件中 {curRows}件表示
            </div>
          </div>
        </div>
      </div>
    );
  }
}