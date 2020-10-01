<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;

use Closure;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request)
        ->header('Access-Control-Allow-Origin','*')
        ->header('Access-Control-Allow-Methods','PUT, GET, POST, DELETE, OPTIONS, PATCH')
        ->header('Access-Control-Allow-Headers','Origin, Content-Type, Accept, Authorization, X-Request-with, cache-control')
        ->header('Access-Control-Allow-Cridentials','true');
        // if(!Auth::check())
        // {
        //  // dd(Auth::user());
        //     return back();
        // }
        // return $next($request);
    }
}
