<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $current_date_time = Carbon::now()->toDateTimeString();
        DB::table('users')->insert([
            'name' => 'Yasser Shkeir',
            'email' => 'yasser@email.com',
            'phone_number' => '81 123 123',
            'dob' => '2000-10-10',
            'password' => Hash::make('test'),
            'location' => '32.2395695,35.1110406',
            'gender' => 0,
            'gender_preference' => 1,
            'interests' => 'Plants',
            'created_at' => $current_date_time
        ]);
        DB::table('users')->insert([
            'name' => 'Wajih Wajouh',
            'email' => 'wajih@email.com',
            'phone_number' => '81 321 123',
            'dob' => '1999-10-10',
            'password' => Hash::make('test'),
            'location' => '32.2193695,35.1110206',
            'gender' => 0,
            'gender_preference' => 1,
            'interests' => 'Cars',
            'created_at' => $current_date_time
        ]);
        DB::table('users')->insert([
            'name' => 'Wajiha Badi3a',
            'email' => 'wajiha@email.com',
            'phone_number' => '81 333 333',
            'dob' => '1999-10-10',
            'password' => Hash::make('test'),
            'location' => '32.1193695,33.9110206',
            'gender' => 1,
            'gender_preference' => 0,
            'interests' => 'Flowers',
            'created_at' => $current_date_time
        ]);
        DB::table('users')->insert([
            'name' => 'Badi3a ZZ',
            'email' => 'Badi3a@email.com',
            'phone_number' => '81 111 333',
            'dob' => '2002-10-10',
            'password' => Hash::make('test'),
            'location' => '32.1113615,33.1110206',
            'gender' => 1,
            'gender_preference' => 0,
            'interests' => 'Baking',
            'created_at' => $current_date_time
        ]);
        DB::table('blocks')->insert([
            'user1_id' => 1,
            'user2_id' => 3,
            'created_at' => $current_date_time
        ]);
        DB::table('blocks')->insert([
            'user1_id' => 3,
            'user2_id' => 2,
            'created_at' => $current_date_time
        ]);
        DB::table('favorites')->insert([
            'user1_id' => 1,
            'user2_id' => 4,
            'created_at' => $current_date_time
        ]);
        DB::table('messages')->insert([
            'sender_id' => 1,
            'receiver_id' => 4,
            'message' => 'Hello ya 7elo',
            'created_at' => $current_date_time
        ]);
        DB::table('messages')->insert([
            'sender_id' => 4,
            'receiver_id' => 1,
            'message' => '?',
            'created_at' => $current_date_time
        ]);
        DB::table('favorites')->insert([
            'user1_id' => 2,
            'user2_id' => 4,
            'created_at' => $current_date_time
        ]);
        DB::table('messages')->insert([
            'sender_id' => 2,
            'receiver_id' => 4,
            'message' => 'Hiiii',
            'created_at' => $current_date_time
        ]);
        DB::table('messages')->insert([
            'sender_id' => 4,
            'receiver_id' => 2,
            'message' => 'HI!',
            'created_at' => $current_date_time
        ]);
    }
}
