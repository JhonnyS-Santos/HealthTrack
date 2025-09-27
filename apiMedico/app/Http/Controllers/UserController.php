<?php

namespace App\Http\Controllers;

use App\Models\userModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;

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
            $user->cepUsers    = (int) $request->cepUsers;
            $user->bairroUsers = $request->bairroUsers;
            $user->ruaUsers    = $request->ruaUsers;
            $user->tipoSUsers  = $request->tipoSUsers;
            $user->alturaUsers = $request->alturaUsers;
            $user->pesoUsers   = $request->pesoUsers;
            $user->numUsers    = (int) $request->numUsers;
            $user->senhaUsers  = Hash::make($request->senhaUsers);

            // 🔹 Tratamento da imagem
            if ($request->hasFile('fotoUsers')) {
                $file = $request->file('fotoUsers');
                $path = $file->store('users', 'public'); // vai salvar em storage/app/public/users
                $user->fotoUsers = '/storage/' . $path;  // salva apenas o caminho no banco
            }

            $user->save();

            return response()->json([
                'message' => 'Usuário criado com sucesso',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
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
    public function updatePhoto(Request $request, $id)
{
    try {
        // Validação mais simples para teste
        $validatedData = $request->validate([
            'fotoUsers' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Aumentei para 5MB
        ]);

        // Encontrar o usuário pelo ID
        $user = userModel::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        // Verificar se há uma nova foto no request
        if ($request->hasFile('fotoUsers')) {
            $file = $request->file('fotoUsers');

            // Log para debug


            // Validar o arquivo
            if (!$file->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Arquivo de imagem inválido'
                ], 400);
            }

            // Deletar a foto anterior se existir
            if ($user->fotoUsers && file_exists(public_path($user->fotoUsers))) {
                unlink(public_path($user->fotoUsers));
            }

            // Salvar a nova foto
            $path = $file->store('users', 'public');
            $user->fotoUsers = '/storage/' . $path;

            // Salvar as alterações no banco
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Foto atualizada com sucesso',
                'fotoUrl' => $user->fotoUsers,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Nenhuma imagem enviada'
            ], 400);
        }

    } catch (\Illuminate\Validation\ValidationException $e) {

        return response()->json([
            'success' => false,
            'message' => 'Erro de validação',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Erro ao atualizar foto',
            'error' => $e->getMessage()
        ], 500);
    }
}
    /**
     * Remove the specified resource from storage.
     */
   /**
 * Remove the specified resource from storage.
 */
public function destroy(string $id)
{
    try {
        // Verifique se o ID é válido
        if (!is_numeric($id) || $id <= 0) {
            return response()->json(['error' => 'ID inválido'], 400);
        }

        $user = UserModel::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuário não encontrado'], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuário deletado com sucesso',
            'id' => $id
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erro interno do servidor',
            'message' => $e->getMessage()
        ], 500);
    }
}
}
