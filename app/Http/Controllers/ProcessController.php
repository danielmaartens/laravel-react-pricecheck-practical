<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProcessController extends Controller
{
    public function index(Request $request)
    {
        $body = $request->body;
        return 'array processed';
    }
}
