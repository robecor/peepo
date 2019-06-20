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

  componentDidUpdate() {
    const {stream} = this.props;

    this.videoRef.current.srcObject = stream;
    this.videoRef.current.play();
  }

  onClickVideo = () => {
    const {peerId, onVideoClick} = this.props;

    if (onVideoClick) {
      onVideoClick(peerId);
    }
  };

  render() {
    const {username} = this.props;

    return (
      <div className="video-item" onClick={this.onClickVideo}>
        <div className="video-item-box">
          <video ref={this.videoRef}/>
        </div>
        <div className="video-item-username">
          <span>{username}</span>
        </div>
      </div>
    );
  }
}
