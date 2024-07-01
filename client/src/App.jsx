import Body from "./components/Body";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WatchPage from "./components/Watch Page/WatchPage";
// import SearchPage from "./components/Search Component/SearchPage";
// import ExplorePage from "./components/Explore Menu/ExplorePage";
// import ChannelPage from "./components/Channel Data/ChannelPage";
import MainContainer from "./components/MainContainer";
import UploadVideo from "./components/admin/Upload/UploadVideo";
// import PlayListPage from "./components/Channel Data/Playlists/PlayListPage";

import {ROUTES} from "./utils/Constants";

console.log(ROUTES);
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Body />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainContainer />,
      },
      {
        path: ROUTES.WATCH,
        element: <WatchPage />,
      },
      {
        path: ROUTES.ADMIN,
        element: <UploadVideo />
      }
      // {
      //   path: "/search",
      //   element: <SearchPage />,
      // },
      // {
      //   path: "/explore",
      //   element: <ExplorePage />,
      // },
      // {
      //   path: "/channelPage",
      //   element: <ChannelPage />,
      // },
      // {
      //   path: "/playlistPage",
      //   element: <PlayListPage />,
      // },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

/*
Heading
Body
  - Sidebar
    - MenuItems
  - MainContainer
    -videoContainer
    -videoCard

*/
