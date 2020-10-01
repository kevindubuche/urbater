<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{csrf_token()}}">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
 <link rel="icon" href="{!! asset('images/logo.png') !!}" />
        <title>URBATeR</title>
       
        <!-- Fonts -->
        {{-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"> --}}
        <link href="/css/app.css" rel="stylesheet" type="text/css">
        

    </head>
    <body>
      <div id="root"></div>
      <script src="/js/app.js"></script>
    </body>
</html>
