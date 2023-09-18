<?php

namespace App\Actions\Auth;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\Http\Controllers\HandlesOAuthErrors;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\AuthorizationServer;
use Nyholm\Psr7\Response as Psr7Response;
use Psr\Http\Message\ServerRequestInterface;

class IssueToken
{
    use HandlesOAuthErrors;
    /**
     * @var \Psr\Http\Message\ServerRequestInterface
     */
    protected $tokenRequest;

    /**
     * The authorization server.
     *
     * @var \League\OAuth2\Server\AuthorizationServer
     */
    protected $server;

    /**
     * The token repository instance.
     *
     * @var \Laravel\Passport\TokenRepository
     */
    protected $tokens;

    /**
     * Create a new controller instance.
     *
     * @param \League\OAuth2\Server\AuthorizationServer $server
     * @param \Laravel\Passport\TokenRepository $tokens
     * @param \Psr\Http\Message\ServerRequestInterface $tokenRequest
     */
    public function __construct(AuthorizationServer $server, TokenRepository $tokens, ServerRequestInterface $tokenRequest)
    {
        $this->server = $server;
        $this->tokens = $tokens;
        $this->tokenRequest = $tokenRequest;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  callable  $next
     * @return mixed
     */
    public function handle(Request $request, $next)
    {
        $request->merge([
            'grant_type' => 'password',
            'client_id' => config('passport.password_grant_client.id'),
            'client_secret' => config('passport.password_grant_client.secret'),
            'scope' => '*',
        ]);

        $tokenResponse = $this->server->respondToAccessTokenRequest(
            $this->tokenRequest->withParsedBody($request->all()),
            new Psr7Response
        );

        dd($tokenResponse);


//
//
//        return $response;
//
//
//
//        return $next($request);
    }

    /**
     * Authorize a client to access the user's account.
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @return \Illuminate\Http\Response
     * @throws \Laravel\Passport\Exceptions\OAuthServerException
     */
    private function issueToken(ServerRequestInterface $request)
    {
        return $this->withErrorHandling(function () use ($request) {
            return $this->convertResponse(
                $this->server->respondToAccessTokenRequest($request, new Psr7Response)
            );
        });
    }
}
