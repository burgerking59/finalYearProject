<?php

use App\Models\User;

test('projects page is displayed', function () {
    $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/projects');

        $response->assertOk();
});
