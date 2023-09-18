<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        $tags = Tag::factory()->count(10)->create();
//        $categories = Category::factory()->count(20)->create();
//
//        foreach ($categories as $category) {
//            $articles = Article::factory()
//                ->count(10)
//                ->for($category)
//                ->hasAttached($tags)
//                ->create();
//            foreach ($articles as $article) {
//                Comment::factory()
//                    ->count(10)
//                    ->for($article)
//                    ->create();
//            }
//        }

        // \App\Models\User::factory(10)->create();

//         \App\Models\User::factory()->create([
//             'name' => 'Admin',
//             'email' => 'admin@example.com',
//             'email_verified_at' => now(),
//             'password' => Hash::make('password'), // password
//             'remember_token' => Str::random(10),
//         ]);
    }
}
