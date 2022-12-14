<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('phone_number')->nullable($value = true);
            $table->text('image')->nullable($value = true);
            $table->date('dob');
            $table->string('password');
            $table->string('location');
            $table->boolean('gender'); // 0 male 1 female
            $table->boolean('gender_preference'); // 0 male 1 female
            $table->string('interests');
            $table->string('bio')->nullable($value = true);
            $table->boolean('incognito')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
