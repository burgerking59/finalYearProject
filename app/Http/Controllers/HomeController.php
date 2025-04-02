<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\File;
use App\Models\Folder;
use App\Models\Project;
use App\Models\User;
use App\Models\Stage;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index($id) {

        $project = Project::where('id', $id)->first();
        if ($project) {
            $folder = Folder::where('project_id', $project->id)->first();
            $files = File::where('folder_id', $folder->id)->get();
            $stages = Stage::where('project_id', $project->id)->get();
            $tasks = array();
            foreach ($stages as $stage) {
                
                $stageTasks = Task::where('stage_id', $stage->id)->get();
                foreach ($stageTasks as $task) {
                    array_push($tasks, $task);
                }
            }
        } else {
            $files = [];
            
        }
        return Inertia::render('Project', [
            'files' => $files,
            'stages' => $stages,
            'tasks' => $tasks,
            'project' => $project['projectName'],
        ]);
    }
}
