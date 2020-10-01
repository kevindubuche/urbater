<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
    protected $table='conferences';
    protected $fillable=['id','title','body','author','source','resume','image','keyWords'];
}
