import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { getDetailArticle } from "@/services/article.service.js";

export const articleDetailLoader = async ({request, params}) => {
    const response = await getDetailArticle(params);

    return {
        article: response
    }
}

const Article = ({article}) => {
    return (
        <div>
            {JSON.stringify(article.data.data)}
            <div>
                <Link to={'/tenant/article'}>Back to list</Link>
            </div>
        </div>
    )
}

const ArticleDetail = () => {
    const navigation = useNavigation();
    const {article} = useLoaderData();
    return (
        <div>
            <div>ArticleDetail</div>
            <div>{navigation.state}</div>
            <Article article={article}/>
        </div>
    )
}

export default ArticleDetail
