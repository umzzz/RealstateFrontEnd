import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid/v4'
class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        let width = window.innerWidth > 1000 ? 1000 : window.innerWidth
        // let calculateHeight = width * 1.33
        let height = window.innerHeight > 500 ? 500 : window.innerWidth
        console.log(window.innerHeight)
        this.setState({ width: width, height: height });
    }
    render() {
        const items = [
            {
                name: "https://picsum.photos/id/1018/1000/600/",
            },
            {
                name: "https://picsum.photos/id/1015/1000/600/",

            }
        ];

        return (

            <Carousel autoPlay={false} >
                {
                    items.map(item => {
                        return (
                            
                            <Paper elevation={0} key={uuid()} >
                                <div className='ImageCarousel-image'>
                                    <img src={item.name} alt="" style={{ height: this.state.height, width: this.state.width }} />
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        )
    }
}

export default ImageCarousel;