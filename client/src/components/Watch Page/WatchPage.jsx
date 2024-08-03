import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import VideoData from "./VideoData";
import { sampleSnippet as snippet, sampleStatistics as statistics, sampleSideVideos as sideVideos } from "../../dummyData";
import SideVideos from "./SideVideos";
import VideoDescription from "./VideoDescription";
import VideoComments from "./VideoComments";

const WatchPage = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [comments, setComments] = useState([]);

  console.log("watch page")
  return (
    <div className={` flex mt-14 mr-5 ${isMenuOpen ? "ml-6" : "ml-6"}`}>
      <div className="w-[70%]">
        <VideoPlayer thumbnail={snippet.thumbnails.videoThumbnail}/>
        <VideoData snippet={snippet} statistics={statistics} />
        <VideoDescription snippet={snippet} statistics={statistics} />
        {comments.length > 0 ? (
          <VideoComments data={{ comments, snippet, statistics }} />
        ) : (
          ""
        )}
      </div>
      <div className="ml-10 w-[30%]">
        {sideVideos.map((video) => (
          <SideVideos video={video} key={video.id.videoId} />
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
