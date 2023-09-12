<?php

namespace App\Models;

use Ndinhbang\QueryCache\Concerns\QueryCacheable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory,
        QueryCacheable;

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
