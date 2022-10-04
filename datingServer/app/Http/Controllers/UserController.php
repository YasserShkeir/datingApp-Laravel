<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function addFavorite(Request $request)
    {
        $currUserID = Auth::id();

        $request->validate([
            'id' => 'required',
        ]);

        $favID = $request->only('id');

        $mytime = Carbon::now();
        $mytime->setTimezone('Asia/Jerusalem');

        $values = array('user1_id' => $currUserID, 'user2_id' => $favID['id'], 'created_at' => $mytime);

        $query = DB::table('favorites')->insert($values);

        return response()->json([
            'status' => 'success',
            "data" => $query
        ]);
    }

    public function getFavorites()
    {
        $users = User::join('favorites', 'users.id', '=', 'favorites.user2_id')->where('favorites.user1_id', '=', Auth::id())->get();

        // $users = DB::table('users') 

        if (Auth::id()) {
            if (!$users) {
                $users = "No favorites yet!";
            }

            return response()->json([
                'status' => 'Retrieved Favorites',
                "users" => $users
            ]);
        }

        return response()->json([
            'status' => 'Not Authorized',
            "message" => 'Please login to view Favorites'
        ]);
    }

    public function editProfile(Request $request)
    {

        $user = Auth::user();

        // function attributeRunner($request, $user, $attribute)
        // {
        //     if ($request[`$attribute`]) {
        //         $user->$attribute = $request[`$attribute`];
        //         return $user->$attribute;
        //     }
        // }

        // foreach ($request->except(['password']) as $attribute) {
        //     echo $attribute;
        //     print_r(attributeRunner($request, $user, $attribute));
        // }

        if ($request['name']) {
            $user->name = $request['name'];
        }
        if ($request['email']) {
            $user->email = $request['email'];
        }
        if ($request['password']) {
            $user->password = Hash::make($request->password);
        }
        if ($request['phone_number']) {
            $user->phone_number = $request['phone_number'];
        }
        if ($request['image']) {
            $user->image = $request['image'];
        }
        if ($request['dob']) {
            $user->dob = $request['dob'];
        }
        if ($request['location']) {
            $user->location = $request['location'];
        }
        if ($request['gender']) {
            $user->gender = $request['gender'];
        }
        if ($request['gender_preference']) {
            $user->gender_preference = $request['gender_preference'];
        }
        if ($request['interests']) {
            $user->interests = $request['interests'];
        }
        if ($request['bio']) {
            $user->bio = $request['bio'];
        }
        if ($request['incognito']) {
            $user->incognito = $request['incognito'];
        }

        // $user->save();

        return response()->json([
            'status' => 'success',
            "data" => $user
        ]);
    }

    public function getUsers()
    {

        $data = User::all()->except(Auth::id());

        return response()->json([
            'status' => 'success',
            "data" => $data
        ]);
    }
}
