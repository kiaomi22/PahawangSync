<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Snorkeling extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity',
        'price_per_day',
        'status'
    ];
}