<?php

use App\Models\User;

test('projects page is displayed', function () {
    $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/projects');

        $response->assertOk();
});

test('project can be created', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('projects.create'), [
            'projectName' => 'Test Project',
            'sprintLength' => '2',
        ])
        ->assertRedirect(route('projects.index'));

    $response
        ->assertSessionHasNoErrors();
});
