import React, {Component} from 'react';

export default class RoomVideo extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {stream} = this.props;

    this.videoRef.current.srcObject = stream;
    this.videoRef.current.play();
  }

  render() {
    return (
      <div>
        <video ref={this.videoRef}/>
      </div>
    );
  }
}
