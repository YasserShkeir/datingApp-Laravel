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
    public function getUsers()
    {
        $user = Auth::user();

        // $data = User::all()->where('incognito', '=', '0')->where('gender', '=', $user->gender_preference)->except(Auth::id());

        $data = DB::table('users')->leftJoin('blocks', 'users.id', '=', 'blocks.user2_id')->get()->where('user2_id', '=', '')->where('id', '!=', $user->id)->where('gender', '=', $user->gender_preference);
        $blocks = DB::table('blocks')->where('user1_id', '=', $user->id)->get();

        return response()->json([
            'status' => 'success',
            'data' => $data,
            'blocks' => count($blocks)
        ]);
    }

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

        $query = DB::table('favorites')->where([
            ['user1_id', '=', $currUserID],
            ['user2_id', '=', $favID['id']]
        ])->get();

        if (count($query) > 0) {
            return response()->json([
                'status' => 'No Edits',
                "data" => count($query)
            ]);
        }

        $query = DB::table('favorites')->insert($values);

        return response()->json([
            'status' => 'success',
            "data" => $query
        ]);
    }

    public function blockUser(Request $request)
    {
        $currUserID = Auth::id();

        $request->validate([
            'id' => 'required',
        ]);

        $blockID = $request->only('id');

        $values = array('user1_id' => $currUserID, 'user2_id' => $blockID['id']);

        $query = DB::table('blocks')->where([
            ['user1_id', '=', $currUserID],
            ['user2_id', '=', $blockID['id']]
        ])->get();

        if (count($query) > 0) {
            return response()->json([
                'status' => 'No Edits',
                "data" => count($query)
            ]);
        }

        $query = DB::table('blocks')->insert($values);

        return response()->json([
            'status' => 'success',
            "data" => $query
        ]);
    }

    public function removeFavorite(Request $request)
    {
        $currUserID = Auth::id();

        $request->validate([
            'id' => 'required',
        ]);

        $favID = $request->only('id');

        $query = DB::table('favorites')->where([
            ['user1_id', '=', $currUserID],
            ['user2_id', '=', $favID['id']]
        ])->delete();

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

        $user->save();

        return response()->json([
            'status' => 'success',
            "data" => $user
        ]);
    }

    public function getMessages(Request $request)
    { }

    public function sendMessage(Request $request)
    { }
}
