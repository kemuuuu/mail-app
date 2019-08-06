import * as React from 'react'

export class Sidebar extends React.Component {
  render() {
    return(
      <div className="sidebar">
        <div className="sidebar__item">
          Item1
        </div>
        <div className="sidebar__item">
          Item2
        </div>
        <div className="sidebar__item">
          Item3
        </div>
        <div className="sidebar__item">
          Item4
        </div>
      </div>
    );
  }
}
