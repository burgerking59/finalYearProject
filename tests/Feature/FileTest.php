<?php
use Illuminate\Http\UploadedFile;

test('file can be uploaded', function () {
 
    $file = UploadedFile::fake()->image('avatar.jpg', 1000);
 
    $response = $this
    ->actingAs($this->user)
    ->post(route('file.store'), [
        'avatar' => $file,
    ]);
    $response
    ->assertSessionHasNoErrors();
    Storage::assertExists('public/'.$file->getClientOriginalName());
});

test('file can be downloaded', function () {
    $response = $this
    ->actingAs($this->user)
    ->get(route('file.download', $this->file['id']));

    $response
    ->assertOk()
    ->assertStatus(200);
});

test('file can be deleted', function () {
    $response = $this
    ->actingAs($this->user)
    ->delete(route('file.destroy', $this->file['id']));
    $response
    ->assertSessionHasNoErrors();
});
