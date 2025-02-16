<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\File;
use App\Models\Folder;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index($id) {

        $project = Project::where('id', $id)->first();
        if ($project) {
            $folder = Folder::where('project_id', $project->id)->first();
            $files = File::where('folder_id', $folder->id)->get();
        } else {
            $files = [];
            
        }

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'files' => $files
        ]);
    }
}
