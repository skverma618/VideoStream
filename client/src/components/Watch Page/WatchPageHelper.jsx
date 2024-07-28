import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { VIDEO_DATA, YOUTUBE_COMMENTS_API } from "../../utils/Constants";
import VideoData from "./VideoData";
import VideoDescription from "./VideoDescription";
import VideoComments from "./VideoComments";
import SideVideos from "./SideVideos";
import { YOUTUBE_SEARCH_RESULT_VIDEOS } from "../../utils/Constants";
import CustomVideoPlayer from "./CustomVideoPlayer";
import VideoPlayer from "./VideoPlayer";

const WatchPageHelper = () => {
  const [comments, setComments] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [sideVideos, setSideVideos] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(closeMenu());
  // }, []);

  const showFull = (e) => {
    e.target.classList.remove("h-20");
  };
  const showLess = (e) => {
    e.target.parentElement.classList.add("h-20");
  };

  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  console.log("watch page")
  return (
    <div className={` flex mt-14 mr-5 ${isMenuOpen ? "ml-48" : "ml-16"}`}>
      <div className="w-[59%]">
        {/* <VideoFrame videoId={videoId} /> */}
        <CustomVideoPlayer videoId={videoId} />
        <VideoPlayer />
        {/* <VideoData snippet={snippet} statistics={statistics} /> */}
        {/* <VideoDescription data={{ snippet, showFull, showLess }} /> */}
        {/* {comments.length > 0 ? (
          <VideoComments data={{ comments, snippet, statistics }} />
        ) : (
          ""
        )} */}
      </div>
      <div className="ml-10">
        {/* {sideVideos.map((video) => (
          <SideVideos video={video} key={video.id.videoId} />
        ))} */}
      </div>
    </div>
  );
};

export default WatchPageHelper;
