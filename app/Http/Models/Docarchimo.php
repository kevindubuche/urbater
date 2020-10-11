<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Docarchimo extends Model
{
    protected $table='docarchimos';
    protected $fillable=['id','title','resume','filename','image'];
}
