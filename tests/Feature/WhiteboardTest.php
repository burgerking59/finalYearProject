<?php

use App\Models\User;
use App\Models\Project;

test('whiteboard can be rendered', function () {
    $user = $this->user;
    $project = $this->project;
    
    $response = $this
    ->actingAs($user)
    ->get('/projects/'.$this->project['id'])
    ->assertStatus(200);
});
