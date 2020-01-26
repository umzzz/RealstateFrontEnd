import React, { Component } from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import uuid from "uuid/v4";
import firstImage from "./img/1.jpg";
import secondImage from "./img/2.jpg";
import thirdImage from "./img/3.jpg";
import forthImage from "./img/4.jpg";

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let width = window.innerWidth > 1000 ? 1000 : window.innerWidth - 30;
    let height = window.innerHeight > 500 ? 500 : window.innerWidth;
    this.setState({ width: width, height: height });
  }
  render() {
    let { images } = this.props;
    return (
      <Carousel autoPlay={false}>
        {images.map(image => {
          return (
            <Paper elevation={0} key={uuid()}>
              <div className="ImageCarousel-image">
                <img
                  src={`https://localhost:44365/api/Attachment/getObject/${image.url}`}
                  alt=""
                  style={{
                    height: this.state.height,
                    width: this.state.width,
                    objectFit: "scale-down"
                  }}
                />
              </div>
            </Paper>
          );
        })}
      </Carousel>
    );
  }
}

export default ImageCarousel;
