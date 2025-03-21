<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;



Route::get('/dashboard', function () {
    return redirect()->route('projects.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


Route::get('/', function () {
    return redirect()->route('projects.index');
});

Route::get('/projects/{id}', [HomeController::class, 'index'])->name('home');

Route::post('/task', [TaskController::class, 'store'])->name('task.store');
Route::post('/task/{id}', [TaskController::class, 'edit'])->name('task.edit');
Route::post('/task/move/{id}', [TaskController::class, 'move'])->name('task.move');
Route::delete('/task/{id}', [TaskController::class, 'destroy'])->name('task.destroy');

Route::post('/file', [FileController::class, 'store'])->name('file.store');
Route::get('/file/{id}', [FileController::class, 'download'])->name('file.download');
Route::delete('/file/{id}', [FileController::class, 'destroy'])->name('file.destroy');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::post('/projects', [ProjectController::class, 'create'])->name('projects.create');
});

require __DIR__.'/auth.php';
