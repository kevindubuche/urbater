<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Lexique extends Model
{
    protected $table='lexique';
    protected $fillable=['id','creole','francais','explication'];
}