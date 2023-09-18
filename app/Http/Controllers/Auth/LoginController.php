<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\IssueToken;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Routing\Pipeline;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        return (new Pipeline(app()))
            ->send($request)
            ->through([
                IssueToken::class
            ])
            ->then(function ($response) {
                return $response;
            });
    }

}
