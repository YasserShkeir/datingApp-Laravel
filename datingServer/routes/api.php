<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get("/login", [AuthController::class, "loginTest"]);

// Route::group("middleware", )