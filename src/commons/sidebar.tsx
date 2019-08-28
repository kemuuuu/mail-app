import * as React from 'react';
import { AppMode } from '../index';

interface SidebarProps {
  onLinkClick: (m: AppMode) => void;
}

export class Sidebar extends React.Component<SidebarProps, {}> {
  render() {
    return(
      <div className="sidebar">
        <a onClick={() => { this.props.onLinkClick(AppMode.TEMPLATE) }}>
          <div className="sidebar__item pointer">
            ホーム
          </div>
        </a>
        <a onClick={() => { this.props.onLinkClick(AppMode.TEMPLATE) }}>
          <div className="sidebar__item pointer">
            メールテンプレート設定
          </div>
        </a>
        <a onClick={() => { this.props.onLinkClick(AppMode.SERVICE) }}>
          <div className="sidebar__item pointer">
            Webサービス連携設定
          </div>
        </a>
        <div className="sidebar__item pointer">
          アカウント設定
        </div>
        <div className="sidebar__item pointer">
          ログ
        </div>
      </div>
    );
  }
}
