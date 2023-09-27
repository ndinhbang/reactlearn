import { Await, defer, Link, useLoaderData, useNavigation } from "react-router-dom";
import { getDetailArticle } from "@/services/article.service.js";
import { Suspense } from "react";

export const articleDetailDeferLoader = async ({request, params}) => {
    const promise = getDetailArticle(params);

    return defer({
        article: promise
    })
}

const Article = ({article}) => {
    return (
        <div>
            {JSON.stringify(article.data.data)}
            <div>
                <Link to={'/admin/article'}>Back to list</Link>
            </div>
        </div>
    )
}

const AdminArticleDetail = () => {
    const data = useLoaderData();
    return (
        <div>
            <div>AdminArticleDetail</div>
            <Suspense
                fallback={<p>Loading ...</p>}
            >
                <Await
                    resolve={data.article}
                >
                    {(article) => <Article article={article}/>}
                </Await>
            </Suspense>
        </div>
    )
}

export default AdminArticleDetail
