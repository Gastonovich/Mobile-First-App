import React, { Component } from "react";

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null
    };
  }
  changeView = () => {
    this.props.back();
  };
  async componentWillMount() {
    let day = this.props.day;
    let month = this.props.month;
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    const response = await fetch(
      "http://api.tvmaze.com/schedule?country=US&date=" +
        this.props.year +
        "-" +
        month +
        "-" +
        day
    );
    const json = await response.json();
    this.setState({
      response: json,
      loading: false
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>loading</div>
        ) : (
          <div>
            <button onClick={this.changeView}>BACK</button>
            <ul className="episodesList">
              {this.state.response.map(item => (
                <li className="episode" key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default Episode;
