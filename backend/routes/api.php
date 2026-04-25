<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\Api\BoatController;

Route::apiResource('boats', BoatController::class);
use App\Http\Controllers\HomestayController;
Route::apiResource('homestays', HomestayController::class);
use App\Http\Controllers\SnorkelingController;
Route::apiResource('snorkelings', SnorkelingController::class);
