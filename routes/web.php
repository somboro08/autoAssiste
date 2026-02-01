<?php

use App\Http\Controllers\MecaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::redirect('/meca-old', '/meca')->name('meca.old');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('meca', MecaController::class)->name('meca');

require __DIR__.'/settings.php';
