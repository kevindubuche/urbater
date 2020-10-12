<?php

namespace App\Http\Controllers\Api;
use App\Http\Models\Docarchimo;
use DB;
use Validator;
use File;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Exception;
class DocarchimoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $docarchimo = Docarchimo::orderBy('title', 'ASC')->get();
        return response()->json([
            "success"=>true,
            "data"=>$docarchimo
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
    // public function Upload(Request $request,$Name_File){  
    //     $filenameWithExt = $request->file($Name_File)->getClientOriginalName();
    //     $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
    //     $extension = $request->file($Name_File)->getClientOriginalExtension();
    //     $filenameToStore = $filename.'.'.$extension;
    //     $path= $request->file($Name_File)->storeAs('public/file/',$filenameToStore);  
    //     return response()->json($request->file($Name_File)->getClientOriginalName(),200);
    // }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'title'=>'required|string',
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
        //handle document
        $folderPath = "docarchimos_files/";
   
    // $file_tmp = $_FILES['file']['tmp_name'];
    // $file_ext = strtolower(end(explode('.',$_FILES['file']['name'])));
    // $file = $folderPath . uniqid() . '.'.$file_ext;
    // move_uploaded_file($file_tmp, $file);


    

    // $filenameWithExt = $request->file('document')->getClientOriginalName();
    // $path= $request->file('document')->storeAs('public/docarchimos_files/',
    // time().'.'.$request->file('document')->getClientOriginalExtension()); 

$file = $request->file('document');
$filename = time().'.'.$file->getClientOriginalExtension();
// $destinationPath = public_path('docarchimos_files') . '/'.$filename;
file_put_contents(public_path().'/docarchimos_files/'.$filename, file_get_contents($request->document));
          
// if(file_put_contents($destinationPath, file_get_contents($request->document))){
// // echo 'Uploaded file';
// }else{
// //echo "Unable to save the file.";
// }
        //fin hadle document
            $user_token = $request->token;
     
                $user = auth('users')->authenticate($user_token);
       
                 if(!$user){
                      return response()->json([
                    "success"=>false,
                    "message"=>"Vous n'avez pas l'autorisation. Votrre session est peut etre expiree. Connectez-vous SVP."
                ],401);
                 }
               
            
            

           

            $docarchimo = new Docarchimo();
            $docarchimo->fill($request->except(["token","image"]));
            $docarchimo->image =$file_name;
            $docarchimo->filename =$filename;

            $docarchimo->save();

            if($profile_picture ==null){

            }else{
                file_put_contents(public_path().'/docarchimos_images/'.$file_name,$fileBin);
            }
            return response()->json([
                "success"=>true,
                "message"=>$docarchimo
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
        $docarchimo = Docarchimo::where('id',$id)->get()->first();
        
        return response()->json([
            "success"=>true,
            "message"=>$docarchimo
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
      
        $docarchimo=Docarchimo::find($id); 
       
   
       //pa bliye valider
        $user_token = $request->token;
        $user = auth('users')->authenticate($user_token);
         if(!$user){
              return response()->json([
            "success"=>false,
            "message"=>"Vous n'avez pas l'autorisation. Votrre session est peut etre expiree. Connectez-vous SVP."
        ],401);
         } 

       $getFile = $docarchimo->image;
       $profile_picture = $request->image;
       if($request->image != $docarchimo->image)//si on a change l'image
       {
        $getFile=="default-avatar.png"? :File::delete(public_path().'/docarchimos_images/'.$getFile);
         
        $image_name = "";
        if($profile_picture==null){
            $image_name= "default-avatar.png";
        }
        else{
            $genarate_name = uniqid()."_".time().date("Ymd")."_IMG";
            $base64Image = $profile_picture;
            $fileBin = file_get_contents($base64Image);
            $minetype = mime_content_type($base64Image);
            if("image/png"==$minetype){
                $image_name = $genarate_name.".png";
            }
            else if("image/jpeg"==$minetype){
                $image_name = $genarate_name.".jpeg";
            }
            else if("image/jpg"==$minetype){
                $image_name = $genarate_name.".jpg";
            }
            else {
                return response()->json([
                    "success"=>false,
                    "message"=>"Only jpg ,png, jpeg files are accepted for setting the image"

                ],500);
            }
        }
        }
        if($request->file('document') != $docarchimo->filename)//si on a change l'image
        {
        File::delete(public_path().'/docarchimos_files/'.$docarchimo->filename);
          
        //  $image_name = null;
         if($request->file('document') !=null)
         {
            $file = $request->file('document');
            $filename = time().'.'.$file->getClientOriginalExtension();
            file_put_contents(public_path().'/docarchimos_files/'.$filename, file_get_contents($request->document));
     
            // $destinationPath = public_path('docarchimos_files') . '/'.$filename;
            // if(file_put_contents($destinationPath, file_get_contents($request->document))){
            // // echo 'Uploaded file';
            // }else{
            // //echo "Unable to save the file.";
            // }
         }
         }
        $docarchimo->fill($request->except(["token","image"]));
        $docarchimo->filename = ($request->filename == $docarchimo->filename) ? $request->filename  : $filename ;
 
  
        $docarchimo->image= ($request->image == $docarchimo->image) ? $request->image  : $image_name ;
        $docarchimo->update();
       

        if($profile_picture ==null){

        }
        else {
            if($request->image != $docarchimo->image)//si on a change l'image
            {
            file_put_contents(public_path().'/docarchimos_images/'.$image_name,$fileBin);
        }
    }


        
        return response()->json([
            "success"=>true,
            "message"=>$docarchimo
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
               $docarchimo=Docarchimo::find($id); 
               $getFile = $docarchimo->image;
               $getFile=="default-avatar.png"? :File::delete(public_path().'/docarchimos_images/'.$getFile);
               File::delete(public_path().'/docarchimos_files/'.$docarchimo->filename);
               //an dnou delete aticle la
               DB::table('docarchimos')->where('id',$id)->delete();
               
               return response()->json('docarchimo supprimee avec succes !');
    }
}
