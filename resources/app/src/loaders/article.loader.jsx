import { getArticles, getDetailArticles } from "@/services/article.service";

export async function articlePaginationLoader({ params }) {
    return await getArticles({ params });
}

export async function articleDetailLoader({ params }) {
    return await getDetailArticles(params);
}
