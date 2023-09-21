import http from "@/utils/http.js";

export async function getArticles({ params }) {
    return await http.get(`articles`, { params: { per_page: 10} });
}

export async function getDetailArticle({ id }) {
    return await http.get(`articles/${id}`);
}
