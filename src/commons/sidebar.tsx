import * as React from 'react'

export class Sidebar extends React.Component {
  render() {
    return(
      <div className="sidebar">
        <a href="/">
          <div className="sidebar__item pointer">
            ホーム
          </div>
        </a>
        <a href="/setting/template/list">
          <div className="sidebar__item pointer">
            メールテンプレート設定
          </div>
        </a>
        <div className="sidebar__item pointer">
          Webサービス連携設定
        </div>
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
