import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";

const WatchPage = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  console.log("watch page")
  return (
    <div className={` flex mt-14 mr-5 ${isMenuOpen ? "ml-48" : "ml-16"}`}>
        <VideoPlayer />
    </div>
  );
};

export default WatchPage;
