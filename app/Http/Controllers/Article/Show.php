<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class Show extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Article $article)
    {
        return new ArticleResource($article);
    }
}
