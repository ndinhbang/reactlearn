import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { getArticles } from "@/services/article.service.js";
import { Suspense } from "react";

const ArticleListItem = ({item}) => {
    return (
        <li key={item.id}>
            <Link to={`${item.id}`}>
                {item.name}
            </Link>
        </li>
    )
}

const ArticleList = ({list}) => {
    const {data: {data: articles}} = list
    return (
        <nav>
            {articles.length ? (
                <ul>
                    {articles.map(article => (
                        <ArticleListItem item={article}/>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No articles</i>
                </p>
            )}
        </nav>
    )
}


export const articlePagingListDeferLoader = async ({request, params}) => {
    const promise = getArticles({params});

    return defer({
        list: promise
    })
}

const AdminArticleIndex = () => {
    const data = useLoaderData();

    return (
        <div>
            <div>AdminArticleIndex</div>

            <div>
                <Link to={'/admin/dashboard'}>Back to dashboard</Link>
            </div>

            <Suspense
                fallback={<p>Loading ...</p>}
            >
                <Await
                    resolve={data.list}
                >
                    {(list) => <ArticleList list={list}/>}
                </Await>
            </Suspense>
        </div>
    )
}

export default AdminArticleIndex
