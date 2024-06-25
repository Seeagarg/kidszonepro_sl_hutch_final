import React from "react";
import ReactPlayer from "react-player/lazy";
import classes from './VideoComponent.module.css';

const VideoComponent = ({
  videoItem,
  showControls = true,
}) => {

  console.log("onVideoComponent")

  let videoUrl=videoItem?.videoUrl;
  
    videoUrl = videoUrl?.replace('http://', 'https://');
  


 console.log("videoUrl ", videoUrl);
  if (videoItem?.videoUrl != "")
    return (
  <>
 
<div className={classes.video_player}>

        <ReactPlayer
          url={videoUrl}
          playing={true}
          controls={showControls}
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          progressInterval={200}
          playsinline={true}
        />
</div>
</>
    );
};

export default VideoComponent;

