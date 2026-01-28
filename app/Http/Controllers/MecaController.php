<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class MecaController extends Controller
{
    /**
     * Display the meca page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('Meca');
    }
}