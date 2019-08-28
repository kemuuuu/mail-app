import * as React from 'react';
import { ServiceSelect } from './service-select';
import { ServiceSalesforce } from './service-salesforce';
import { ServiceKintone } from './service-kintone';

interface ServiceHomeState {
  service: Service | null;
}

export class Service {
  static SALESFORCE = 'salesforce';
  static KINTONE = 'kintone';
  static CHATWORK = 'chatwork';
  static SLACK = 'slack';
  static BACKLOG = 'backlog';
}

export class ServiceHome extends React.Component<{}, ServiceHomeState> {

  constructor(props) {
    super(props);
    this.state = {
      service: null
    };
    this.change = this.change.bind(this);
    this.goBackSelect = this.goBackSelect.bind(this);
  }

  change(s: Service) {
    this.setState({ service: s });
  }

  goBackSelect() {
    this.setState({ service: null });
  }

  render() {
    return(
      <div>
        {(() => {
          if (!this.state.service) {
            return <ServiceSelect onLinkClick={this.change} />
          } else if (this.state.service === Service.SALESFORCE) {
            return <ServiceSalesforce />
          } else if (this.state.service === Service.KINTONE) {
            return <ServiceKintone backselect={this.goBackSelect}/>
          }
        })()}
      </div>
    );
  }
}