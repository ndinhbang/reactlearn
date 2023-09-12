<?php

namespace App\Models;

use Ndinhbang\QueryCache\Concerns\QueryCacheable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory,
        QueryCacheable;

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    public function latestArticle(): HasOne
    {
        return $this->hasOne(Article::class)->latestOfMany();
    }

    public function comments(): HasManyThrough
    {
        return $this->hasManyThrough(
            Comment::class,
            Article::class,
            'category_id', // Foreign key on the environments table...
            'article_id', // Foreign key on the deployments table...
            'id', // Local key on the projects table...
            'id' // Local key on the environments table...
        );
    }
}
