import { useNavigation } from "react-router-dom";

const ArticleDetail = () => {
    const navigation = useNavigation();

    return (
        <div>ArticleDetail {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default ArticleDetail
