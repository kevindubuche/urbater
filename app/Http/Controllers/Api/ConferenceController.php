<?php

namespace App\Http\Controllers\Api;
use App\Http\Models\Conference;
use DB;
use Validator;
use File;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Exception;
class ConferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $conference = Conference::orderBy('created_at', 'DESC')->get();
        return response()->json([
            "success"=>true,
            "data"=>$conference
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
            'title'=>'required|string',
            'body'=>'required|string',
            'author'=>'required|string',
            'source'=>'required|string',
            'resume'=>'required|string',
        ]);
        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->message()->toArray()
            ],500);
        }

        $profile_picture = $request->image;
        $file_name = "";
        if($profile_picture==null){
            $file_name = "default-avatar.png";
        }
        else{
            $genarate_name = uniqid()."_".time().date("Ymd")."_IMG";
            $base64Image = $profile_picture;
            $fileBin = file_get_contents($base64Image);
            $minetype = mime_content_type($base64Image);
            if("image/png"==$minetype){
                $file_name = $genarate_name.".png";
            }else if("image/jpeg"==$minetype){
                $file_name = $genarate_name."jpeg";
            }else if("image/jpg"==$minetype){
                $file_name = $genarate_name.".jpg";
            }
            else{
                return response()->json([
                    "success"=>false,
                    "message"=>"Only jpg, png, jpeg files are accepted for setting the image"
                ],500);
            }
        }
            $user_token = $request->token;
     
                $user = auth('users')->authenticate($user_token);
       
                 if(!$user){
                      return response()->json([
                    "success"=>false,
                    "message"=>"Vous n'avez pas l'autorisation. Votrre session est peut etre expiree. Connectez-vous SVP."
                ],401);
                 }
               
            
            

           

            $conference = new Conference();
            $conference->fill($request->except(["token","image"]));
            $conference->image =$file_name;

            $conference->save();

            if($profile_picture ==null){

            }else{
                file_put_contents(public_path().'/conferences_images/'.$file_name,$fileBin);
            }
            return response()->json([
                "success"=>true,
                "message"=>$conference
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
        $conference = Conference::where('id',$id)->get()->first();
        
        return response()->json([
            "success"=>true,
            "message"=>$conference
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
        $conference=Conference::find($id); 
       //pa bliye valider
        // return response()->json($request);
        
        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token); 

       $getFile = $conference->image;
       $profile_picture = $request->image;
       if($request->image != $conference->image)//si on a change l'image
       {
        $getFile=="default-avatar.png"? :File::delete(public_path().'/conferences_images/'.$getFile);
         
        $file_name = "";
        if($profile_picture==null){
            $file_name= "default-avatar.png";
        }
        else{
            $genarate_name = uniqid()."_".time().date("Ymd")."_IMG";
            $base64Image = $profile_picture;
            $fileBin = file_get_contents($base64Image);
            $minetype = mime_content_type($base64Image);
            if("image/png"==$minetype){
                $file_name = $genarate_name.".png";
            }
            else if("image/jpeg"==$minetype){
                $file_name = $genarate_name.".jpeg";
            }
            else if("image/jpg"==$minetype){
                $file_name = $genarate_name.".jpg";
            }
            else {
                return response()->json([
                    "success"=>false,
                    "message"=>"Only jpg ,png, jpeg files are accepted for setting the image"

                ],500);
            }
        }
        }
        $conference->fill($request->except(['token','image']));
        $conference->image= ($request->image == $conference->image) ? $request->image  : $file_name ;
        $conference->save();

        if($profile_picture ==null){

        }
        else {
            if($request->image != $conference->image)//si on a change l'image
            {
            file_put_contents(public_path().'/conferences_images/'.$file_name,$fileBin);
        }
    }


        
        return response()->json([
            "success"=>true,
            "message"=>$conference
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
               //nal deye nom image la poun ddelete li avan
               $conference=Conference::find($id); 
               $getFile = $conference->image;
               $getFile=="default-avatar.png"? :File::delete(public_path().'/conferences_images/'.$getFile);
               //an dnou delete aticle la
               DB::table('conferences')->where('id',$id)->delete();
               
               return response()->json('Conference supprimee avec succes !');
    }
}
