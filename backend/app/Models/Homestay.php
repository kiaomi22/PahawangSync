<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homestay extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'total_rooms',
        'price_per_night',
        'status'
    ];
}