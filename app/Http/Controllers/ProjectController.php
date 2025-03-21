<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Project;
use App\Models\Folder;
use App\Models\Stage;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index() {
        $projects = Project::where('user_id', Auth::id())->get();
        return Inertia::render('Projects', [
            'projects' => $projects
        ]);
    }

    public function create(Request $request) {
        $project = new Project();
        $project->projectName = $request->projectName;
        $project->sprintLength = $request->sprintLength;
        $project->user_id = Auth::id();
        $project->save();
        $folder = new Folder();
        $folder->project_id = $project->id;
        $folder->folderName = "folder";
        $folder->save();
        $stages = ['Backlog', "Sprint Backlog", "Doing", "Completed"];
        foreach ($stages as $stage) {
            $stageDb = new Stage();
            $stageDb->project_id = $project->id;
            $stageDb->stageName = $stage;
            $stageDb->save();
        }
        return redirect()->back();
    }
}
