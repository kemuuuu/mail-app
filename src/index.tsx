import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Components
import { Header } from './commons/header';
import { Sidebar } from './commons/sidebar';
import { Footer } from './commons/footer';

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
            コンテンツ
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