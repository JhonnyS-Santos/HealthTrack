<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userModel extends Model
{
    use HasFactory;

    protected $table = 'users';
    public $timestamps = false;

    public $fillable = ['nomeUsers', 'emailUsers', 'dataNUsers', 'estadoUsers', 'cepUsers', 'bairroUsers', 'ruaUsers','numUsers', 'fotoUsers', 'tipoSUsers','alturaUsers','pesoUsers','senhaUsers'];

}
