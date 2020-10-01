<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Konbit extends Model
{
    protected $table='konbits';
    protected $fillable=['id','title','body','author','source','resume','image','keyWords'];
}
