import { Link, useLoaderData, useNavigation, useParams } from "react-router-dom";
import { getArticles } from "@/services/article.service.js";
import { useQuery } from "@tanstack/react-query";

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

const articleListQuery = params => ({
    queryKey: ['articles'],
    queryFn: async () => getArticles({params}),
})


export const articlePagingListLoader = (queryClient) => async ({request, params}) => {
    const query = articleListQuery(params)

    console.log('cached data', queryClient.getQueryData(query.queryKey))

    return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
    )
    // const response = await getArticles({params});
    // return {
    //     list: response
    // }
}

const ArticleIndex = () => {
    const navigation = useNavigation();
    const params = useParams()
    const response = useQuery(articleListQuery(params))
    // console.log(response)
    // const {list} = useLoaderData();



    return (
        <div>
            <div>ArticleIndex</div>
            <div>{navigation.state}</div>
            <div>
                <Link to={'/tenant/dashboard'}>Back to dashboard</Link>
            </div>

            <ArticleList list={response.data}/>
        </div>
    )
}

export default ArticleIndex
