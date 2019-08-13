import * as React from 'react';
import { ServiceKintoneRegister } from './service-kintone-register';
import { ServiceKintoneEditor } from './service-kintone-editor';
import { getData, generateGetUrlObj } from '../../utils/fetch-utils';

interface ServiceKintoneState {
  haveRegistered: boolean;
  loaded: boolean;
}

interface ServiceKintoneProps {}


export class ServiceKintone extends React.Component<ServiceKintoneProps, ServiceKintoneState> {

  constructor(props) {
    super(props);
    this.state = {
      haveRegistered: false,
      loaded: false
    };
  }

  componentWillMount() {
    // Create URL_OBJECT
    const type = 'kintone'
    const params = { type: type }
    const path = '/api/v1/kintone/auth/find';
    const host = document.baseURI;
    const url = generateGetUrlObj(host, path, params)

    // Exec fetch(GET)
    getData(url)
      .then((data) => {
        if (data.result) {
          this.setState({
            haveRegistered: true,
            loaded: true
          })
        } else {
          this.setState({
            haveRegistered: false,
            loaded: true
          })
        }
      })
      .catch(err => { 
        console.error(err)
      });
  }

  render() {
    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">kintone連携</h1>
        </div>
        <div className="service-kintone-wrapper">
          <div className="service-kintone-content">
            {(() => {
              if (this.state.loaded) {
                if (this.state.haveRegistered) {
                  return <ServiceKintoneEditor />;
                } else {
                  return <ServiceKintoneRegister />;
                }
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