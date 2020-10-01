<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\User;
use JWTAuth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWtAuth\Exeptions\JWTException; 



class AuthController extends Controller 
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),
        [   'name'=>'required|string',
            'email'=>'required|email',
            'password'=>'required|string|min:6'
        ]);

        if($validator->fails()){
            return  response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ],400);
        }
        $check_email = User::where('email',$request->email)->count();
        if($check_email > 0){
            return response()->json([
                'success'=>false,
                'message'=>'This email already exist please try another email'
            ],200);
        }

        //$this->user nan plas User
     $registerComplete = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);
        if($registerComplete){
           return $this->login($request);
        }

    }


    public function login(Request $request){
        $validator = Validator::make($request->only('email','password'),
        [
            'email'=>'required|email',
            'password'=>'required|string|min:6',
        ]);
        if($validator->fails()){
            return  response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray(),
            ],400);
        }
    
        $jwt_token = null;
     
        $input = $request->only('email','password');
    
        if(!$jwt_token =auth('users')->attempt($input)){
            return response()->json([
                'success'=>false,
                'message'=>'Invalid email or password'
            ]);
        }
        return response()->json([
            'success'=>true,
            'token'=>$jwt_token,
        ]);
    }

    public function logout(){
        Auth::guard('users')->logout();
    
    return response()->json([
        'success'=>true,
        'message'=>'logout',
    ],200);

    }
}
