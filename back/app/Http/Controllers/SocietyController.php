<?php

namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SocietyController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Society::select('id','company_name', 'address', 'company_email','nif','stat','logo')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'company_name'=>'required',
            'address'=>'required',
            'company_email'=>'required',
            'nif'=>'required',
            'stat'=>'required',
            'logo'=>'required|image'
        ]);
        try{
            $imageName = Str::random().'.'.$request->logo->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('society/logo', $request->logo,$imageName);
            Society::create($request->post()+['logo'=>$imageName]);

            return response()->json([
                'message'=>'Society Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a society!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Society $society)
    {
        return response()->json([
            'society'=>$society
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Society $society)
    {
        $request->validate([
            'company_name'=>'required',
            'address'=>'required',
            'company_email'=>'required',
            'nif'=>'required',
            'stat'=>'required',
            'logo'=>'nullable'
        ]);
        try{

            $society->fill($request->post())->update();

            if($request->hasFile('logo')){

                // remove old image
                if($society->logo){
                    $exists = Storage::disk('public')->exists("society/logo/{$society->logo}");
                    if($exists){
                        Storage::disk('public')->delete("society/logo/{$society->logo}");
                    }
                }

                $logoName = Str::random().'.'.$request->logo->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('society/logo', $request->logo,$logoName);
                $society->logo = $logoName;
                $society->save();
            }

            return response()->json([
                'message'=>'Society Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a society!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Society $society)
    {
        try {

            if($society->logo){
                $exists = Storage::disk('public')->exists("society/logo/{$society->logo}");
                if($exists){
                    Storage::disk('public')->delete("society/logo/{$society->logo}");
                }
            }

            $society->delete();

            return response()->json([
                'message'=>'society Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a society!!'
            ]);
        }
    }
}
