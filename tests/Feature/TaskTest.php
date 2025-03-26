<?php

use App\Models\User;
use App\Models\Project;


test('task can be created', function () {
    $user = $this->user;
    $project = $this->project;
    $response = $this
    ->actingAs($user)
    ->post(route('task.store'), [
        'stageId' => $this->stage['id'],
        'title' => 'Test Task',
        'description' => 'this is a test'
    ]);
    $response
    ->assertStatus(200)
    ->assertSessionHasNoErrors();
});

test('task can be edited', function () {

});

test('task can be moved', function () {

});

test('task can be deleted', function () {

});