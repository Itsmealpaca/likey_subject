import { createBrowserRouter } from "react-router";
import { Feed } from "./components/feed";
import { PostDetail } from "./components/post-detail";
import { MembershipSelect } from "./components/membership-select";
import { PurchasePost } from "./components/purchase-post";
import { CreatePost } from "./components/create-post";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Feed,
  },
  {
    path: "/post/:id",
    Component: PostDetail,
  },
  {
    path: "/membership",
    Component: MembershipSelect,
  },
  {
    path: "/purchase/:id",
    Component: PurchasePost,
  },
  {
    path: "/create",
    Component: CreatePost,
  },
]);
