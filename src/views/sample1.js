import React, { Component } from 'react';
import '../../node_modules/fundamental-styles/dist/fundamental-styles.css';
import data from '../item-details.json'
// const data = {
//   "id": 2,
//   "name": "karthik"
// }
export default class Sample1 extends Component {

  render() {
    const f = () => {
      for (let k in data[0]) {
        console.log(k + " " + data[0][k]);
      }
    }
    return (
      <div>
        <section className="fd-section">
          <div className="fd-section__header">
            <h1 className="fd-section__title">Sample 1</h1>
          </div>
          <div className="fd-panel">
            <button onClick={f} />
          </div>
        </section>
      </div>
    );
  }
}
