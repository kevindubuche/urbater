<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

// class MailController extends Controller
// {
//     //
//     public function sendEmail()
//     {
//         $title = '[Confirmation] Thank you for your order';
//         $customer_details = [
//             'name' => 'Arogya',
//             'address' => 'kathmandu Nepal',
//             'phone' => '123123123',
//             'email' => 'kevindubuche@gmail.com'
//         ];
//         $order_details = [
//             'SKU' => 'D-123456',
//             'price' => '10000',
//             'order_date' => '2020-01-22',
//         ];

//         $content='this is the content of the mail';
//         $sendmail = Mail::to($customer_details['email'])->send(new SendMail($title, $content, $customer_details, $order_details));
//         if (empty($sendmail)) {
//             return response()->json(['message' => 'Mail Sent Sucssfully'], 200);
//         }else{
//             return response()->json(['message' => 'Mail Sent fail'], 400);
//         }
//     }
// }