import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

/* Each page should be wrapped in the Layout component */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
