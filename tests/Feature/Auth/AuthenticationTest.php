<?php

use App\Models\User;

test('login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function () {
    $password = 'password';
    $user = User::factory()->create([ 'password' => $password, ]);

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => $password,
    ]);
    $this->assertDatabaseCount('users', 2);
    $this->assertAuthenticated();
    //$response->assertRedirect('/projects');
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
