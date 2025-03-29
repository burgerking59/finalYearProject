<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

use App\Models\User;
use App\Models\Project;
use App\Models\Stage;
use App\Models\Folder;
use App\Models\File;
use App\Models\Task;
use Illuminate\Http\UploadedFile;


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
        $this->stage2 = Stage::factory()->create([
            'project_id' => $this->project['id'],
        ]);
        $this->task = Task::factory()->create([
            'stage_id' => $this->stage['id'],
        ]);
        $this->folder = Folder::factory()->create([
            'project_id' => $this->project['id'],
        ]);
        $this->storageFile = UploadedFile::fake()->image('test.jpg', 1000);
        $this->storageFile->storeAs('public', $this->storageFile->getClientOriginalName());
        $this->file = File::factory()->create([
            'fileName' => $this->storageFile->getClientOriginalName(),
            'folder_id' => $this->folder['id'],
        ]);
        
    }
}
