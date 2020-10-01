<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    protected $table='annonces';
    protected $fillable=['id','title','body','author','source','resume','image','keyWords'];
}
