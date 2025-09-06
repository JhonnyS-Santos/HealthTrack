<?php

namespace App\Http\Controllers;

use App\Models\userModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = UserModel::all();
        return $users;
    }

    public function login(Request $request)
    {
        $request->validate([
            'emailUsers' => 'required|email',
            'senhaUsers' => 'required'
        ]);

        // Busca o usuário pelo email
        $user = UserModel::where('emailUsers', strtolower($request->emailUsers))->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Email ou senha incorretos'], 401);
        }

        // Verifica a senha com Hash::check
        if (!Hash::check($request->senhaUsers, $user->senhaUsers)) {
            return response()->json(['success' => false, 'message' => 'Email ou senha incorretos'], 401);
        }

        // Login bem-sucedido
        return response()->json([
            'success' => true,
            'message' => 'Login realizado com sucesso',
            'user' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = new UserModel();

            $user->nomeUsers   = $request->nomeUsers;
            $user->emailUsers  = $request->emailUsers;
            $user->dataNUsers  = $request->dataNUsers;
            $user->estadoUsers = $request->estadoUsers;
            $user->cepUsers    = (int)$request->cepUsers;
            $user->bairroUsers = $request->bairroUsers;
            $user->ruaUsers    = $request->ruaUsers;
            $user->numUsers    = (int)$request->numUsers;
            $user->fotoUsers   = $request->fotoUsers;
            $user->senhaUsers  = Hash::make($request->senhaUsers);

            $user->save();

            return response()->json(['message' => 'Usuário criado com sucesso', 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(userModel $userModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(userModel $userModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, userModel $userModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(userModel $userModel)
    {
        //
    }
}
