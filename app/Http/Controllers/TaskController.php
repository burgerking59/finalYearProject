<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function store(Request $request) {
        $task = new Task();
        $task->stage_id = $request->stageId;
        $task->taskName = $request->title;
        $task->description = $request->description;
        $task->save();
    }

    public function edit($id, Request $request) {
        $task = Task::findOrFail($id);
        $task->taskName = $request->title;
        $task->description = $request->description;
        $task->save();
    }

    public function move($id, Request $request) {
        $task = Task::findOrFail($id);
        $task->stage_id = $request->stageId;
        $task->save();
    }

    public function destroy($id) {
        $task = Task::findOrFail($id);
        $task->delete();
    }
}
