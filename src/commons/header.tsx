import * as React from 'react'


export class Header extends React.Component {
  render () {
    return(
      <div className='header'>
        <h1 className="pointer"><a href="/"><img src="./images/logo.png" height="45px;" width="auto"></img></a></h1>
      </div>
    );
  }
}
