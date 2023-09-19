<?php

namespace App\Src\Passport\ResponseTypes;

use Illuminate\Http\Response;
use League\OAuth2\Server\Entities\AccessTokenEntityInterface;
use League\OAuth2\Server\Entities\RefreshTokenEntityInterface;
use League\OAuth2\Server\ResponseTypes\BearerTokenResponse as BaseBearerTokenResponse;
use LogicException;
use Illuminate\Support\Facades\Cookie;

class BearerTokenResponse extends BaseBearerTokenResponse
{
    /**
     * @return \Illuminate\Http\Response
     * @see static::generateHttpResponse
     */
    public function toResponse(): Response
    {
        $expireDateTime = $this->accessToken->getExpiryDateTime()->getTimestamp();

        $responseParams = [
            'token_type' => 'Bearer',
            'expires_in' => $expireDateTime - \time(),
            'access_token' => (string)$this->accessToken,
        ];

        if ($this->refreshToken instanceof RefreshTokenEntityInterface) {

            $refreshTokenExpireTime = $this->refreshToken
                ->getExpiryDateTime()
                ->getTimestamp();

            $refreshTokenPayload = \json_encode([
                'client_id' => $this->accessToken->getClient()->getIdentifier(),
                'refresh_token_id' => $this->refreshToken->getIdentifier(),
                'access_token_id' => $this->accessToken->getIdentifier(),
                'scopes' => $this->accessToken->getScopes(),
                'user_id' => $this->accessToken->getUserIdentifier(),
                'expire_time' => $refreshTokenExpireTime,
            ]);

            if ($refreshTokenPayload === false) {
                throw new LogicException('Error encountered JSON encoding the refresh token payload');
            }

            $responseParams['refresh_token'] = $this->encrypt($refreshTokenPayload);

            Cookie::queue(
                new \Symfony\Component\HttpFoundation\Cookie(
                    name: config('passport.cookie.refresh_token'),
                    value: $responseParams['refresh_token'],
                    expire: $refreshTokenExpireTime,
                    domain: config('session.domain'),
                    secure: true,
                    httpOnly: true,
                    sameSite: config('session.same_site'),
                )
            );
        }

        $responseParams = \json_encode(\array_merge($this->getExtraParams($this->accessToken), $responseParams));

        if ($responseParams === false) {
            throw new LogicException('Error encountered JSON encoding response parameters');
        }

        Cookie::queue(
            new \Symfony\Component\HttpFoundation\Cookie(
                name: config('passport.cookie.fingerprint'),
                value: $this->accessToken->getFingerprint(),
                expire: $expireDateTime,
                domain: config('session.domain'),
                secure: true,
                httpOnly: true,
                sameSite: config('session.same_site'),
            )
        );

        return (new Response($responseParams, Response::HTTP_OK))
            ->withHeaders([
                'pragma' => 'no-cache',
                'cache-control' => 'no-store',
                'content-type' => 'application/json; charset=UTF-8',
            ]);
    }

    /**
     * Add custom fields to your Bearer Token response here, then override
     * AuthorizationServer::getResponseType() to pull in your version of
     * this class rather than the default.
     *
     * @param AccessTokenEntityInterface $accessToken
     *
     * @return array
     */
    protected function getExtraParams(AccessTokenEntityInterface $accessToken)
    {
        return [];
    }
}
