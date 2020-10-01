<?php

namespace App\Http\Controllers\Api;
use App\Http\Models\Annonce;
use App\Http\Models\Article;
use DB;
use Validator;
use File;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Exception;
class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $annonce = Annonce::orderBy('created_at', 'DESC')->get();
        return response()->json([
            "success"=>true,
            "data"=>$annonce
        ],200);
    }

        public function search(Request $request)
    {
        $array1=[];
        $array2=[];
        $result=collect();
        //nap pran only id a pou genere ink la ak titre la, maybe resume a
       $annonces = Annonce::select('id','title','resume','created_at')
       ->where('keyWords','LIKE','%'.$request->keyWords.'%')
       ->get();
       $articles = Article::select('id','title','resume','created_at')
       ->where('keyWords','LIKE','%'.$request->keyWords.'%')
       ->get();
       
       $array1 =$annonces->map(function($item, $key) { 
           $item->link="/annonce/".$item->id;
           return $item;
       });
    //    array_push($result,$array1);
       $array2 =$articles->map(function($item, $key) { 
        $item->link="/article/".$item->id;
        return $item;
    });
    foreach($array1 as $ar1)
         $result->push($ar1);
    foreach($array2 as $ar2)
         $result->push($ar2);
    // $result= $array1->push($array2);
    // array_push($result,$array2);
        return response()->json([
            "success"=>true,
            "data"=>$result
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
               
            
            

           

            $annonce = new Annonce();
            $annonce->fill($request->except(["token","image"]));
            $annonce->image =$file_name;

            $annonce->save();

            if($profile_picture ==null){

            }else{
                file_put_contents(public_path().'/annonces_images/'.$file_name,$fileBin);
            }
            return response()->json([
                "success"=>true,
                "message"=>$annonce
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
        $annonce = Annonce::where('id',$id)->get()->first();
        
        return response()->json([
            "success"=>true,
            "message"=>$annonce
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
        $annonce=Annonce::find($id); 
       //pa bliye valider
        // return response()->json($request);
        
        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token); 

       $getFile = $annonce->image;
       $profile_picture = $request->image;
       if($request->image != $annonce->image)//si on a change l'image
       {
        $getFile=="default-avatar.png"? :File::delete(public_path().'/annonces_images/'.$getFile);
         
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
        $annonce->fill($request->except(['token','image']));
        $annonce->image= ($request->image == $annonce->image) ? $request->image  : $file_name ;
        $annonce->save();

        if($profile_picture ==null){

        }
        else {
            if($request->image != $annonce->image)//si on a change l'image
            {
            file_put_contents(public_path().'/annonces_images/'.$file_name,$fileBin);
        }
    }


        
        return response()->json([
            "success"=>true,
            "message"=>$annonce
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
               $annonce=Annonce::find($id); 
               $getFile = $annonce->image;
               $getFile=="default-avatar.png"? :File::delete(public_path().'/annonces_images/'.$getFile);
               //an dnou delete aticle la
               DB::table('annonces')->where('id',$id)->delete();
               
               return response()->json('Annonce supprimee avec succes !');
    }
}
