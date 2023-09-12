import { Link, useLoaderData, useNavigation } from "react-router-dom";

const ArticleIndex = () => {
    const {data: { data: articles}} = useLoaderData();
    const navigation = useNavigation();

    return (
        <div>ArticleIndex {navigation.state === "loading" ? "loading" : ""}
            <nav>
                {articles.length ? (
                    <ul>
                        {articles.map((article) => (
                            <li key={article.id}>
                                <Link to={`${article.id}`}>
                                    {article.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>
                        <i>No articles</i>
                    </p>
                )}
            </nav>
        </div>
    )
}
 export default ArticleIndex
