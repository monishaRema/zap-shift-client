import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to Zap Shift</h1>,
    errorElement: <h2>Page Not Found</h2>
  }
 ])

export default router;