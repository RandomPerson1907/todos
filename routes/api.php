<?php

use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('tasks/{type}', function ($type) {
    $faker = Faker\Factory::create();

    $tasks = [];
    for($i = 0; $i < 20; $i++) {
        $tasks[] = [
            "title" => $faker->sentence(),
            "body" => $faker->text()
        ];
    }

    return response()->json($tasks);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
