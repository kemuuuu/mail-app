import * as React from 'react';

import { Template } from '../../mailconnect';
import { TemplateList } from './template-list';
import { TemplateCreate } from './template-create';
import { TemplateEdit } from './template-edit';
import { TemplateKeyRegister } from './template-key-register';

interface TemplateHomeState {
  mode: TemplateMode;
  selectedTemplateId: string;
  showModal: boolean;
}

interface OnClickEvent extends React.MouseEvent<HTMLAnchorElement> {
  target: HTMLAnchorElement
}

class TemplateMode {
  static LIST = 'list';
  static CREATE = 'create';
  static EDIT = 'edit';
  static REGISTER = 'register';
  static DELETE = 'delete';
}

export class TemplateHome extends React.Component<{}, TemplateHomeState> {

  constructor(props) {
    super(props);
    this.state = {
      mode: TemplateMode.LIST,
      selectedTemplateId: '',
      showModal: false
    };
    // binding
    this.createClick = this.createClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.goBackList = this.goBackList.bind(this);
  }

  /**
   * リスト表示に戻る
   */
  goBackList() {
    this.setState({
      mode: TemplateMode.LIST,
      showModal: false
    });
  }

  /**
   * 新規作成クリック
   */
  createClick() {
    this.setState({ mode: TemplateMode.CREATE });
  }

  /**
   * 編集クリック
   * @param e
   */
  editClick(e: OnClickEvent) {
    this.setState({
      mode: TemplateMode.EDIT,
      selectedTemplateId: e.target.id
    });
  }

  /**
   * キー登録クリック
   * @param e 
   */
  registerClick(e: OnClickEvent) {
    this.setState({
      mode: TemplateMode.REGISTER,
      selectedTemplateId: e.target.id
    });
  }

  /** 
   * 削除クリック
  */
  deleteClick(e: OnClickEvent) {
    this.setState({
      showModal: true,
      selectedTemplateId: e.target.id
    });
  }

  /**
   * モーダル閉じるクリック
   */
  onModalClose() {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      (() => {
        // LIST
        if (this.state.mode === TemplateMode.LIST) {
          return <TemplateList
                  showModal={this.state.showModal}
                  selectedTemplateId={this.state.selectedTemplateId}
                  onCreateClick={this.createClick}
                  onEditClick={this.editClick}
                  onRegisterClick={this.registerClick}
                  onDeleteClick={this.deleteClick}
                  onModalClose={this.onModalClose}
                  backList={this.goBackList}/>
        }
        // CREATE
        else if (this.state.mode === TemplateMode.CREATE) {
          return <TemplateCreate 
                  backList={this.goBackList}/>
        } 
        // EDIT
        else if (this.state.mode === TemplateMode.EDIT) {
          return <TemplateEdit 
                  seletedTemplateId={this.state.selectedTemplateId}
                  backList={this.goBackList} />
        } 
        // KEY REGISTER
        else if (this.state.mode === TemplateMode.REGISTER) {
          return <TemplateKeyRegister
                  selectedTemplateId={this.state.selectedTemplateId}
                  backList={this.goBackList}/>
        }
      })()
    );
  }
}