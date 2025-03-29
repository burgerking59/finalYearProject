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
    $user = $this->user;
    $project = $this->project;
    $task = $this->task;
    $response = $this
    ->actingAs($user)
    ->post(route('task.edit', $task['id']), [
        'title' => 'Test Task',
        'description' => 'this is a test'
    ]);
    $response
    ->assertStatus(200)
    ->assertSessionHasNoErrors();
});

test('task can be moved', function () {
    $user = $this->user;
    $project = $this->project;
    $task = $this->task;
    $response = $this
    ->actingAs($user)
    ->post(route('task.move', $task['id']), [
        'stageId' => $this->stage2['id'],
    ]);
    $response
    ->assertStatus(200)
    ->assertSessionHasNoErrors();
});

test('task can be deleted', function () {
    $user = $this->user;
    $project = $this->project;
    $task = $this->task;
    $response = $this
    ->actingAs($user)
    ->delete(route('task.destroy', $task['id']));
    $response
    ->assertStatus(200)
    ->assertSessionHasNoErrors();
});