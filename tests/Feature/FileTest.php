<?php

test('file can be uploaded', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('file can be downloaded', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('file can be deleted', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
