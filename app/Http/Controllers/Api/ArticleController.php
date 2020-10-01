<?php

namespace App\Http\Controllers\Api;

use App\Http\Models\Article;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Validator;
use File;
class ArticleController extends Controller
{
    
 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        $blogs = Article::all();
        return response()->json([
            "success"=>true,
            "data"=>$blogs
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
        [   'title'=>'required|string',
            'body'=>'required|string',
            'author'=>'required|string',
            'source'=>'required|string',
        ]);
        if($validator->fails()){
            return  response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ],500);
        }

        $profile_picture = $request->image;
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

        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token);
     
            $article = new Article(); 
        $article->fill($request->except(['token','image']));
        $article->image=$file_name;

        $article->save();

        if($profile_picture ==null){

        }
        else {
         
            file_put_contents(public_path().'/articles_images/'.$file_name,$fileBin);
        }
        return response()->json([
            "success"=>true,
            "message"=>$article
        ],200);
        // return response()->json([$request->all()]);
       
      
        
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $blogArticle = Article::where('id',$id)->get();
        return response()->json($blogArticle);
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
        $article=Article::find($id); 
       
        // return response()->json($request);
        
        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token); 

       $getFile = $article->image;
       $profile_picture = $request->image;
       if($request->image != $article->image)//si on a change l'image
       {
        $getFile=="default-avatar.png"? :File::delete(public_path().'/articles_images/'.$getFile);
         
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
        $article->fill($request->except(['token','image']));
        $article->image= ($request->image == $article->image) ? $request->image  : $file_name ;
        $article->save();

        if($profile_picture ==null){

        }
        else {
            if($request->image != $article->image)//si on a change l'image
            {
            file_put_contents(public_path().'/articles_images/'.$file_name,$fileBin);
        }
    }


        
        return response()->json([
            "success"=>true,
            "message"=>$article
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
        $article=Article::find($id); 
        $getFile = $article->image;
        $getFile=="default-avatar.png"? :File::delete(public_path().'/articles_images/'.$getFile);
        //an dnou delete aticle la
        DB::table('articles')->where('id',$id)->delete();
        //en en profite pour effacer tous les commenetaires relatifs a ceta article
        DB::table('comments')->where('idArticle',$id)->delete();
        return response()->json('Arcticle supprime avec succes !');
    }
}
