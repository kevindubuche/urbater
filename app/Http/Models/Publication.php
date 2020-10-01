<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    protected $table='publications';
    protected $fillable=['id','title','body','author','source','resume','image','keyWords'];
}
