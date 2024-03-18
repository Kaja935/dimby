<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Workhour;
use Illuminate\Http\Request;


class WorkhourController extends Controller
{
    public function index() {
        $workhour = Workhour::all();
        return response()->json([
            'workhour' => $workhour
        ]);
    }

    public function store(Request $request)
        {
            $workhour = new Workhour();
            $workhour->nom = $request->nom;
            $workhour->total_hour = $request->total_hour;
            $workhour->delay_tolerance = $request->delay_tolerance;
            $workhour->created_at = Carbon::now(); 
            $workhour->save();
    
            return response()->json(['message' => 'Work hour created successfully', 'workhour' => $workhour]);

        }

        public function update(Request $request, $id)
        {
            $workhour = Workhour::find($id);
            $workhour->nom = $request->nom;
            $workhour->total_hour = $request->total_hour;
            $workhour->delay_tolerance = $request->delay_tolerance;
            $workhour->updated_at = Carbon::now(); 
            $workhour->save();
    
            return response()->json(['message' => 'Work hour updated successfully', 'workhour' => $workhour]);
        }
    

        public function destroy($id)
        {
            $workhour = Workhour::find($id);
            if (!$workhour) {
                return response()->json(['message' => 'Work hour not found'], 404);
            }
            $workhour->delete();
        
            return response()->json(['message' => 'Work hour deleted successfully']);
        }
        
    public function show($id)
    {
        $workhour = Workhour::find($id);
        if (!$workhour) {
            return response()->json(['message' => 'Work hour not found'], 404);
        }
        return response()->json(['workhour' => $workhour]);
    }

}
