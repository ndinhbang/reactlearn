import { getArticles, getDetailArticles } from "@/services/article.service";
import { defer } from "react-router-dom";

export async function articlePaginationLoader({ params }) {
    const promise = getArticles({ params });

    return defer({
        articles: promise
    })
}

export async function articleDetailLoader({ params }) {
    return await getDetailArticles(params);
}
