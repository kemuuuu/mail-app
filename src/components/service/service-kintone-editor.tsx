import * as React from 'react';

interface ServiceKintoneEditorProps {}

interface ServiceKintoneEditorState {
  functions: any[]
}

interface OnClickEvent extends React.MouseEvent<HTMLAnchorElement> {
  target: HTMLAnchorElement
}

export class ServiceKintoneEditor extends React.Component<ServiceKintoneEditorProps, ServiceKintoneEditorState> {

  constructor(props) {
    super(props);
    this.state = {
      functions: []
    }
  }

  onEditClick(e: OnClickEvent) {

  }

  onDeleteClick(e: OnClickEvent) {

  }

  createFunctionList() {

    if (this.state.functions.length < 1) return;

    const templateList = this.state.functions.map(e => {
      return (
        <tr className="datarow" key={e.id}>
          <td>{e.name}</td>
          <td>{e.appName}</td>
          <td>
            <a className="pointer icon-button" id={e.id} onClick={(e: OnClickEvent) => this.onEditClick(e)}>
              <img id={e.id} src="./images/icon__edit.png" alt="edit" height="20px" width="auto"/>
              <span id={e.id} className="tooltip"><span id={e.id} className="text">編集</span></span>
            </a>
          </td>
          <td>
            <a className="pointer icon-button" id={e.id} onClick={(e: OnClickEvent) => this.onDeleteClick(e)}>
              <img id={e.id} src="./images/icon__delete.png" alt="delete" height="20px" width="auto"/>
              <span id={e.id} className="tooltip"><span id={e.id} className="text">削除</span></span>
            </a>
          </td>
        </tr>
      );
    });
    return templateList;
  }

  render() {

    const rows = this.state.functions.length;
    const curRows = this.state.functions.length;
    const functionList = this.createFunctionList();

    return(
      <div className="kintone-connect-form">
        <h2>連携設定</h2>
        <a href="/setting/service/kintone/func/create" className="btn-border--create pointer">新規ファンクション作成</a>
        <div className="template-list-content">
          <table>
            <thead>
              <tr>
                <th>
                  ファンクション名
                </th>
                <th>
                  連携先アプリ名
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
              {functionList}
            </tbody>
          </table>
          <div className="table-footer">
            全{rows}件中 {curRows}件表示
          </div>
        </div>
      </div>
    );
  }
}