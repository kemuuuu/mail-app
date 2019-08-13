import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

// Components--commons
import { Header } from './commons/header';
import { Sidebar } from './commons/sidebar';
import { Footer } from './commons/footer';

// Components--template
import { TemplateList } from './components/template/template-list';
import { TemplateCreate } from './components/template/template-create';
import { TemplateEdit } from './components/template/template-edit';
import { TemplateKeyRegister } from './components/template/template-key-register';

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
              <Route exact path="/setting/" component={TemplateList}/>
              <Route path="/setting/template/list" component={TemplateList}/>
              <Route path="/setting/template/create" component={TemplateCreate}/>
              <Route path="/setting/template/edit/:id" component={TemplateEdit}/>
              <Route path="/setting/template/key-register/:id" component={TemplateKeyRegister} />
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