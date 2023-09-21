import { getArticles, getDetailArticle } from "@/services/article.service.js";
import { defer } from "react-router-dom";

export async function articlePaginationLoader({ params }) {
    const promise = getArticles({ params });

    return defer({
        articles: promise
    })
}

export async function articleDetailLoader({ params }) {
    return await getDetailArticle(params);
}
