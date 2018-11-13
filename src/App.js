import React, { Component } from "react";
import Episodes from "./Episodes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      currentMonth: date.getMonth(),
      currYear: date.getFullYear(),
      indicatedMonth: date.getMonth(),
      indicatedYear: date.getFullYear(),
      indicatedDay: 5,
      firstView: false,
      monthList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
    this.changeView = this.changeView.bind(this);
    this.dicrementMonth = this.dicrementMonth.bind(this);
    this.incrementMonth = this.incrementMonth.bind(this);
  }
  backToCalendar() {
    this.setState({
      firstView: true,
      indicatedDay: null
    });
  }
  changeView(item) {
    if (this.state.firstView) {
      this.setState({
        firstView: false,
        indicatedDay: item
      });
    } else {
      this.setState({
        firstView: true,
        indicatedDay: null
      });
    }
  }
  daysInMonth(month, year) {
    let dayInMonth = new Date(year, month, 0).getDate();
    let result = [];
    for (let i = 1; i <= dayInMonth; i++) {
      result.push(i);
    }
    return result;
  }
  dicrementMonth() {
    if (this.state.indicatedMonth > 1) {
      this.setState({ indicatedMonth: this.state.indicatedMonth - 1 });
    } else {
      this.setState({
        indicatedYear: this.state.indicatedYear - 1,
        indicatedMonth: 12
      });
    }
  }
  incrementMonth() {
    if((this.state.indicatedYear < this.state.currYear)||
        (this.state.indicatedMonth < this.state.currentMonth && this.state.indicatedYear === this.state.currYear)) {
      if (this.state.indicatedMonth < 12) {
        this.setState({ indicatedMonth: this.state.indicatedMonth + 1 });
      } else {
        this.setState({
          indicatedYear: this.state.indicatedYear + 1,
          indicatedMonth: 1
        });
      }
    }
  }
  doRequest(item) {
    this.setState({
      firstView: false,
      indicatedDay: item
    });
  }
  render() {
    const days = this.daysInMonth(
      this.state.indicatedMonth,
      this.state.indicatedYear
    );
    const calendar = days.map(item => (
      <li
        className="day"
        onClick={() => this.changeView(item)}
        key={item.toString()}
      >
        {item.toString()}
      </li>
    ));
    return (
      <div className="App">
        {this.state.firstView ? (
          <div>
            <img className="logotype" alt="logo" src={require('./television-tv-png-22274.png')} />
            <div className="calendarBody">
              <div className="header">
                <button className="arrows" onClick={this.dicrementMonth}>
                  {" "}
                  &lt;{" "}
                </button>
                <div className="monthName">
                {this.state.monthList[this.state.indicatedMonth-1]}
                </div>
                <button className="arrows" onClick={this.incrementMonth}>
                  {" "}
                  &gt;{" "}
                </button>
              </div>
              <ul className="calendar">{calendar}</ul>
            </div>
          </div>
        ) : (
          <div>
            <Episodes
              back={this.changeView}
              day={this.state.indicatedDay}
              month={this.state.indicatedMonth}
              year={this.state.indicatedYear}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
