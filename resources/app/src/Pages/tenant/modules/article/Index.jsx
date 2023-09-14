import { useNavigation } from "react-router-dom";

const ArticleIndex = () => {
    const navigation = useNavigation();

    return (
        <div>ArticleIndex {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default ArticleIndex
