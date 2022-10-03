<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // public function getFavorites()
    // {
    //     $data = User::where;

    //     return response()->json([
    //         'status' => 'success',
    //         "data" => $data
    //     ]);
    // }


    public function getUsers(Request $request)
    {
        // $request->validate([
        //     'id' => 'required|string',
        // ]);

        $data = User::all()->except(Auth::id());

        return response()->json([
            'status' => 'success',
            "data" => $data
        ]);
    }
}
