import * as React from 'react';

export class ServiceSelect extends React.Component {

  render() {
    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">連携サービス選択</h1>
        </div>
        <div className="service-select-wrapper">
          <div className="service-select-content">
            <a href="/setting/service/salesforce">
              <div className="service-logo-outer">
                <div className="service-logo-inner pointer">
                  <img className="service-logo-img" src="./images/service/salesforce_logo.png" width="200px" height="auto" />
                </div>
              </div>
            </a>
            <a href="/setting/service/kintone">
              <div className="service-logo-outer">
                <div className="service-logo-inner pointer">
                  <img className="service-logo-img" src="./images/service/kintone_logo.png" width="200px" height="auto" />
                </div>
              </div>
            </a>
            <div className="service-logo-outer">
              <div className="service-logo-inner pointer">
                <img id="slack-logo" className="service-logo-img" src="./images/service/slack_logo.png" width="200px" height="auto" />
              </div>
            </div>
            <div className="service-logo-outer">
              <div className="service-logo-inner pointer">
                <img className="service-logo-img" src="./images/service/chatwork_logo.png" width="200px" height="auto" />
              </div>
            </div>
            <div className="service-logo-outer">
              <div className="service-logo-inner pointer">
                <img id="backlog-logo" className="service-logo-img" src="./images/service/backlog_logo.png" width="200px" height="auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}