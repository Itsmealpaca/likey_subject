import { createBrowserRouter } from "react-router";
import { Feed } from "./components/feed";
import { PostDetail } from "./components/post-detail";
import { MembershipSelect } from "./components/membership-select";
import { PurchasePost } from "./components/purchase-post";
import { CreatePost } from "./components/create-post";
import { HeartCharge } from "./components/heart-charge";

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
    path: "/membership/:id",
    Component: MembershipSelect,
  },
  {
    path: "/purchase/:id",
    Component: PurchasePost,
  },
  {
    path: "/hearts/charge/:id",
    Component: HeartCharge,
  },
  {
    path: "/create",
    Component: CreatePost,
  },
]);
