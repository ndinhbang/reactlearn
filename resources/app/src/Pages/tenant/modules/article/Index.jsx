import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { getArticles } from "@/services/article.service.js";

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


export const articlePagingListLoader = async ({request, params}) => {
    const response = await getArticles({params});
    return {
        list: response
    }
}

const ArticleIndex = () => {
    const navigation = useNavigation();
    const {list} = useLoaderData();

    return (
        <div>
            <div>ArticleIndex</div>
            <div>{navigation.state}</div>
            <div>
                <Link to={'/tenant/dashboard'}>Back to dashboard</Link>
            </div>

            <ArticleList list={list}/>
        </div>
    )
}

export default ArticleIndex
