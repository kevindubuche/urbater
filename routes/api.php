<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group([
    'prefix'=>'user',
    'namespace'=>'User',
],
function(){
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout');
}
);
Route::resource('blog','Api\ArticleController');
Route::resource('comment','Api\CommentController');
Route::resource('annonce', 'Api\AnnonceController');
Route::resource('publication', 'Api\PublicationController');
Route::resource('konbit', 'Api\KonbitController');
Route::resource('conference', 'Api\ConferenceController');
Route::resource('lexique', 'Api\LexiqueController');
Route::post('search','Api\AnnonceController@search');
// Route::get('blog/{id}','Api\BlogController@show');

// Route::post('mail','Api\MailController@sendEmail');
Route::group(['prefix' => ''], function () {
    Route::post('sendmail', 'MailController@sendEmail');
});