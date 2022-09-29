<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;

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

Route::group(['middleware' => ['cors']], function () {
    

    Route::get('blogs', [BlogController::class, 'index'])->name('index');

    Route::post('blogs', [BlogController::class, 'index'])->name('index');

    Route::get('login', [AuthController::class, 'login'])->name('login');

    Route::post('login', [AuthController::class, 'login'])->name('login');

    Route::post('registro', [AuthController::class, 'registro'])->name('registro');

});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
