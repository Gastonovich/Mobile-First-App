import React, { Component } from "react";

class ShowView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomImg: false
    };
    this.zoomingPicture = this.zoomingPicture.bind(this);
  }
  zoomingPicture() {
    this.setState({ zoomImg: !this.state.zoomImg });
  }
  render() {
    let className = "show_container";
    if (this.state.zoomImg) {
      className += " original_size";
    }
    return (
      <div className={className}>
        <div>
        <img
          alt="show logo"
          className="tvShowLogo"
          src={
            this.state.zoomImg
              ? this.props.item.show.image.original
              : this.props.item.show.image.medium
          }
          onClick={this.zoomingPicture}
        />
        </div>
        <div className="descriptionContainer">
        <p>
        {this.props.item.name}
        </p>
        </div>
      </div>
    );
  }
}
export default ShowView;
