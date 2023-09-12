<?php

namespace App\Http\Middleware;

use Closure;
use GrahamCampbell\SecurityCore\Security;

class Santinizer
{
    protected Security $santinizer;

    public function __construct(Security $santinizer)
    {
        $this->santinizer = $santinizer;
    }

    /**
     * Set the proper Bouncer scope for the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(\Illuminate\Http\Request $request, Closure $next): mixed
    {
        $request->merge($this->cleanArray($request->input()));

        return $next($request);
    }

    /**
     * Clean a specified value or values.
     *
     * @param array $values
     *
     * @return string|int|bool|array|float|null
     */
    public function cleanArray(array $values): string|int|bool|array|null|float
    {
        return array_map(function ($value) {
            return match (true) {
                is_array($value) => $this->cleanArray($value),
                is_bool($value), is_int($value), is_float($value), is_null($value) => $value,
                default => trim($this->santinizer->clean((string)$value)),
            };
        }, $values);
    }
}
