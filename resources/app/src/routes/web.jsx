import Error404 from "@/Pages/Error404";
import Dashboard from "@/Pages/Dashboard";
import ArticleIndex from "@/Pages/article";
import Home from "@/Pages";
import ArticleDetail from "@/Pages/article/Detail";
import { articleDetailLoader, articlePaginationLoader } from "@/loaders/article.loader.jsx";

const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/articles",
                loader: articlePaginationLoader,
                element: <ArticleIndex />,
            },
            {
                path: "/articles/:id",
                loader: articleDetailLoader,
                element: <ArticleDetail />,
            },
        ]
    },

]

export default routes;
