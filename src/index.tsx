import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

// Components--commons
import { Header } from './commons/header';
import { Sidebar } from './commons/sidebar';
import { Footer } from './commons/footer';

// Components
import { TemplateList } from './components/template/template-list';
import { TemplateCreate } from './components/template/template-create';
import { TemplateEdit } from './components/template/template-edit';
import { TemplateKeyRegister } from './components/template/template-key-register';

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