import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GithubActionsPage from "./catalog/github-actions/GithubActionsPage";
import {DockerPage} from "./catalog/docker/DockerPage";
import ReactPage from "./catalog/react/ReactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/github-actions",
    element: (
      <Layout>
        <GithubActionsPage />
      </Layout>
    ),
  },
  {
    path: "/docker",
    element: (
      <Layout>
        <DockerPage />
      </Layout>
    ),
  },
  {
    path: "/react",
    element: (
      <Layout>
        <ReactPage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
