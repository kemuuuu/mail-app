import * as React from 'react';
import { postData } from '../../utils/fetch-utils';

export class ServiceSalesforce extends React.Component {

  componentWillMount() {
    const url = '/api/v1/salesforce/connect';
    postData(url, {})
      .then((res) => {console.log(res)})
      .catch((err) => {console.error(err)})
  }

  render() {
    return(
      <div>
        <div className="template-list-heading">
          <h1 className="template-list-heading-title">salesforce連携</h1>
        </div>
        <div className="service-salesforce-wrapper">
          
        </div>
      </div>
    );
  }
}