import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';


class TrackList extends React.Component {
  render() {
    let tracks = this.props.tracks;

    return ( <
      div className = "TrackList" > {
        this.props.tracks.map(track => {
          return <Track track = {
            track
          }
          key = {
            track.ID
          }
          onAdd = {
            this.props.onAdd
          }
          onRemove = {
            this.props.onRemove
          }
          isRemoval = {
            this.props.isRemoval
          }
          />
        })
      } <
      /div>
    );
  }
}

export default TrackList;
