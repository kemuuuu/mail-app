import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

// Components--commons
import { Header } from './commons/header';
import { Sidebar } from './commons/sidebar';
import { Footer } from './commons/footer';

// Components
import { TemplateHome } from './components/template/template-home';

// Components--service
import { ServiceSelect } from './components/service/service-select';
import { ServiceSalesforce } from './components/service/service-salesforce';
import { ServiceKintone } from './components/service/service-kintone';
import { ServiceKintoneFuncCreater } from './components/service/service-kintone-func-creater';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="sidebar-box">
            <Sidebar />
          </div>
          <div className="main-box">
            <BrowserRouter>
              <Route exact path="/setting/" component={TemplateHome}/>
              <Route path="/setting/template" component={TemplateHome} />
              <Route path="/setting/service/select" component={ServiceSelect} />
              <Route path="/setting/service/salesforce" component={ServiceSalesforce} />
              <Route exact path="/setting/service/kintone" component={ServiceKintone} />
              <Route path="/setting/service/kintone/func/create" component={ServiceKintoneFuncCreater} />
            </BrowserRouter>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)