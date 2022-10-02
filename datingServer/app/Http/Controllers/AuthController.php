<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    function loginTest()
    {
        // $email = ""; ////
        // $password = ""; ////hash

        return response()->json([
            "status" => "success",
            "message" => "hi"
        ]);
    }
}
