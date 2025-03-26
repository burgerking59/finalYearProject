<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

use App\Models\User;
use App\Models\Project;
use App\Models\Stage;
use App\Models\Folder;


abstract class TestCase extends BaseTestCase
{
    protected function setup() : void {
        parent::setup();
        $this->user = User::factory()->create();
        $this->project = Project::factory()->create([
            'user_id' => $this->user['id'],
        ]);
        $this->stage = Stage::factory()->create([
            'project_id' => $this->project['id'],
        ]);
        $this->folder = Folder::factory()->create([
            'project_id' => $this->project['id'],
        ]);
    }
}
