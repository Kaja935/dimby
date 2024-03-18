<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workhours extends Model
{
    use HasFactory;

    protected $fillable= ['nom','total_hour','delay_tolerance'];
}
