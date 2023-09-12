<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("articles")
    ->name('articles.')
    ->group(function () {
        Route::get('/', \App\Http\Actions\Article\BrowseAction::class)->name('index');
//        Route::get('/select', \App\Http\Actions\Article\SelectAction::class)->name('select');
//        Route::post('/', \App\Http\Actions\Article\CreateAction::class)->name('store');
        Route::get('/{article}', \App\Http\Actions\Article\ShowAction::class)->name('show');
//        Route::put('/{article}', \App\Http\Actions\Article\UpdateAction::class)->name('update');
//        Route::delete('/{article}', \App\Http\Actions\Article\DeleteAction::class)->name('destroy');
//        Route::delete('/', \App\Http\Actions\Article\BulkDeleteAction::class)->name('bulk_destroy');
    });
