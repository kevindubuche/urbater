<?php

namespace App\Http\Controllers\Api;
use App\Http\Models\Lexique;
use DB;
use Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LexiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lexique = Lexique::orderBy('created_at', 'DESC')->get();
        return response()->json([
            "success"=>true,
            "data"=>$lexique
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'creole'=>'required|string',
            'francais'=>'required|string',
            'explication'=>'required|string',
        ]);
        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->message()->toArray()
            ],500);
        }
        $user_token = $request->token;
     
        $user = auth('users')->authenticate($user_token);

         if(!$user){
              return response()->json([
            "success"=>false,
            "message"=>"Vous n'avez pas l'autorisation. Votrre session est peut etre expiree. Connectez-vous SVP."
        ],401);
         }

         $lexique = new Lexique();
            $lexique->fill($request->except(["token"]));
            $lexique->save();
            return response()->json([
                "success"=>true,
                "message"=>$lexique
            ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lexique = Lexique::where('id',$id)->get()->first();
        
        return response()->json([
            "success"=>true,
            "message"=>$lexique
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $lexique=Lexique::find($id); 
        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token); 

        $lexique->fill($request->except(['token']));
         $lexique->save();
         return response()->json([
            "success"=>true,
            "message"=>$lexique
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //add autheticatioon
        $lexique=Lexique::find($id); 
        DB::table('lexique')->where('id',$id)->delete();
        return response()->json('Mot supprimee avec succes !');
               
    }
}
