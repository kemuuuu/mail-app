import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Components--commons
import { Header } from './commons/header';
import { Sidebar } from './commons/sidebar';
import { Footer } from './commons/footer';

// Components
import { TemplateHome } from './components/template/template-home';

// Components--service
import { ServiceHome } from './components/service/service-home';

interface AppState {
  mode: AppMode;
  reload: boolean;
}

export class AppMode {
  static TEMPLATE = 'template';
  static SERVICE = 'service';
}

class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);
    this.state = {
      mode: AppMode.TEMPLATE,
      reload: false
    }
    this.change = this.change.bind(this);
  }

  change(m: AppMode) {
    this.setState({
      mode: m
    });
  }

  render () {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="sidebar-box">
            <Sidebar onLinkClick={this.change}/>
          </div>
          <div className="main-box">
            {(() => {
              if (this.state.mode === AppMode.TEMPLATE) {
                return <TemplateHome />
              } else if (this.state.mode === AppMode.SERVICE) {
                return <ServiceHome />
              }
            })()}
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