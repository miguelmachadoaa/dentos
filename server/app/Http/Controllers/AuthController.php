<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Models\User;

use Carbon\Carbon;

use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {

        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);


        $user=User::where('email', $request->email)->first();

        if(isset($user->id)){

            if (Hash::check(request('password'), $user->password)) {

                $user->remember_token=md5(rand(0,9999999).rand(0,9999999));

                $user->update();
                
                $array = array('error'=>false,'token' => $user->remember_token);

            }else{

                $array = array('error'=>true, 'mensaje' => 'Datos Erroneos');
            }

        }else{

            $array = array('error'=>true, 'mensaje' => 'No se encontro usuario');
        }


        

        return $array;
    }

     public function registro(Request $request)
    {


        if(is_null($request->email) || is_null($request->password) || is_null($request->dob)){

            $array = array('error'=>true, 'mensaje' => 'Todos los campos son requeridos' );

        }else{

            $user=User::where('email', $request->email)->first();

            if(isset($user->id)){

            $array = array('error'=>true, 'mensaje' => 'Email ya existe' );



            }else{

                $date1 = Carbon::now();

                 $date2 = Carbon::create($request->dob);

                 $diff= $date1->diffInYears($date2); 

                 if($diff>17){

                    $user = User::create([
                        'name' => $request->email,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'remember_token' => md5(Hash::make($request->password)),
                        'email_verified_at'=>now(),
                    ]);

                    $user->remember_token=md5(rand(0,9999999).rand(0,9999999));

                    $user->update();

                    $array = array('error'=>false, 'mensaje' => 'Usuario registrado Satisfactoriamente', 'token'=>$user->remember_token, 'user'=>$user );

                 }else{

                    $array = array('error'=>true, 'mensaje' => 'Debe ser mayor de edad para registrarse');

                 }


            }


            

        }
        
        return $array;

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
