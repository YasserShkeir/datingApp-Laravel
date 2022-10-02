<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getUsers()
    {
        $data = User::all();

        return response()->json([
            'status' => 'success',
            "data" => $data
        ]);
    }
}
