<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class Browse extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $items = Article::select('*')
            ->when(
                $request->has('per_page'),
                fn ($query) => $query->paginate($request->per_page ?? 10),
                fn ($query) => $query->take($request->limit ?? 250)->get(),
            );

        return ArticleResource::collection($items);
    }
}
