<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;
    public  $senderEmail;
    public $senderName;
    public $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //
        $this->senderEmail = $data->email;
        $this->senderName= $data->name;
        $this->content = $data->content;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('urbater.mail@gmail.com')
        ->subject('Visiteur du site web URBATer')
        ->view('emails.sendEmail');
    }
}