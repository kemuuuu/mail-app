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