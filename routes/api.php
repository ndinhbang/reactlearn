<?php

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

Route::prefix("v1")->name('v1.')->group(function () {
    Route::prefix("auth")->name('auth.')->group(function () {
        Route::post('login', \App\Http\Controllers\Auth\LoginController::class)->name('login')->middleware(['throttle:5,5']);
    });

    // Authenticated Routes
    Route::middleware(['auth:api'])->group(function () {
        Route::delete('logout', \App\Http\Controllers\Auth\LogoutController::class)->name('logout');
        Route::get('iam', \App\Http\Controllers\User\ShowController::class)->name('iam');

        Route::prefix("user")->name('user.')->group(function () {
            Route::get('/', \App\Http\Controllers\User\ShowController::class)->name('show');
        });
    });
});

Route::prefix("articles")
    ->name('articles.')
    ->group(function () {
        Route::get('/', \App\Http\Controllers\Article\BrowseAction::class)->name('index');
//        Route::get('/select', \App\Http\Actions\Article\SelectAction::class)->name('select');
//        Route::post('/', \App\Http\Actions\Article\CreateAction::class)->name('store');
        Route::get('/{article}', \App\Http\Controllers\Article\ShowAction::class)->name('show');
//        Route::put('/{article}', \App\Http\Actions\Article\UpdateAction::class)->name('update');
//        Route::delete('/{article}', \App\Http\Actions\Article\DeleteAction::class)->name('destroy');
//        Route::delete('/', \App\Http\Actions\Article\BulkDeleteAction::class)->name('bulk_destroy');
    });
