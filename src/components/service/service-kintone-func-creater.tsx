import * as React from 'react';
import { getData, generateGetUrlObj } from '../../utils/fetch-utils';
import { AuthInfo } from '../../mailconnect';

interface ServiceKintoneFuncCreaterState {
  authInfo: AuthInfo;
  loaded: boolean;
}

interface ServiceKintoneFuncCreaterProps {}

export class ServiceKintoneFuncCreater extends React.Component<ServiceKintoneFuncCreaterProps, ServiceKintoneFuncCreaterState> {

  constructor(props) {
    super(props);
    this.state = { 
      authInfo: {
        id: '',
        token: '',
        refresh_token: '',
        type: '',
        base_url: ''
      },
      loaded: false
    };
  }

  componentWillMount() {
    // Create URL_OBJECT
    const type = 'kintone'
    const params = { type: type }
    const path = '/api/v1/kintone/auth/find';
    const host = document.baseURI;
    const url = generateGetUrlObj(host, path, params);

    // Exec fetch(GET)
    getData(url)
    .then((data) => {
      if (data.result) {
        this.setState({ authInfo: data.result })
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
          <h1 className="template-list-heading-title">kintone連携ファンクション作成</h1>
        </div>
        <div className="service-kintone-wrapper">
          <div className="service-kintone-content">
            {(() => {
                if (this.state.loaded) {
                  
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