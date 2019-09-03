<?php

Route::get('/', function () {
    return view('index');
});

Route::post('/process', 'ProcessController@index');
