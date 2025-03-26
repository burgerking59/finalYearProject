<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\File;
use App\Models\Folder;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    
    public function store(Request $request)
    {
        $file = $request->file('avatar');
        if ($file != null) {
        $project = Project::first();
        $folder = Folder::where('project_id', $project->id)->first();
        $dbFile = new File();
        $dbFile->fileName = $file->getClientOriginalName();
        $dbFile->folder_id = $folder->id;
        $dbFile->save();
        //Storage::disk('public')->put($file->getClientOriginalName(), $file);
        $file->storeAs('public', $file->getClientOriginalName());
        }
        return redirect()->back();
    }

    public function download($id)
    {
        $file = File::findOrFail($id);
        $fileName = $file->fileName;
        
        if (Storage::exists('public/'.$fileName)) {
            //dd('check');
            return Storage::download('public/'.$fileName, $fileName);
        } else {
            return redirect()->back();
        }
    }

    public function destroy($id)
    {
        $file = File::findOrFail($id);
        $file->delete();
        return redirect()->back();
    }
}
