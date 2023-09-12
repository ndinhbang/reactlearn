import { useLoaderData, useNavigation } from "react-router-dom";

const ArticleDetail = () => {
    const navigation = useNavigation();
    const {data: { data: article}} = useLoaderData();
    return (
        <div>ArticleDetail {navigation.state === "loading" ? "loading" : ""}
            <div>{JSON.stringify(article)}</div>
        </div>
    )
}
 export default ArticleDetail
