<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class MailController extends Controller
{
    //
    public function sendEmail(Request $request)
    {
       
//   $sendmail=  Mail::send([], [], function ($message) use ($request){
//         $message->to('kevin.dubuche@student.ueh.edu.ht')
//           ->subject('MESSAGE D\'UN VISITEUR DU SITE WEB URBATeR')
//           // here comes what you want
//           ->setFrom(['kevindubuche@gmail.com' => 'John Doe'])
//           ->setBody($request->message); // assuming text/plain
//       });
//         if (empty($sendmail)) {
//             return response()->json(['message' => 'Mail Sent Sucssfully'], 200);
//         }else{
//             return response()->json(['message' => 'Mail Sent fail'], 400);
//         }
//     }

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
                //SEND EMAIL*****************************************
                $data = new \stdClass();
                $data->email = $request->email;
                $data->name = $request->nom;
                $data->content = $request->message;
                
                $sendmail=  Mail::to('kevin.dubuche@student.ueh.edu.ht')->send(new SendMail($data));
                if (empty($sendmail)) {
                     return response()->json(['message' => 'Mail Sent Sucssfully'], 200);
                 }else{
                    return response()->json(['message' => 'Mail Sent fail'], 400);
             }
                
                
                //FIN SEND EMAIL*****************************************

}
}