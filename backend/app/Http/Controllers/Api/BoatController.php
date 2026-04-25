<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Boat;
use Illuminate\Http\Request;

class BoatController extends Controller
{
    public function index()
    {
        $boats = Boat::all();
        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil daftar kapal',
            'data'    => $boats
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'capacity' => 'required|integer',
            'price_per_day' => 'required|numeric'
        ]);

        $boat = Boat::create([
            'name' => $request->name,
            'capacity' => $request->capacity,
            'price_per_day' => $request->price_per_day,
            'status' => 'available' // Status bawaan
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data Kapal berhasil ditambahkan!',
            'data'    => $boat
        ], 201);
    }

    public function show($id)
    {
        $boat = Boat::find($id);
        if (!$boat) {
            return response()->json(['success' => false, 'message' => 'Data Kapal tidak ditemukan'], 404);
        }
        return response()->json(['success' => true, 'message' => 'Detail Kapal', 'data' => $boat]);
    }

    public function update(Request $request, $id)
    {
        $boat = Boat::find($id);
        if (!$boat) {
            return response()->json(['success' => false, 'message' => 'Data Kapal tidak ditemukan'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string',
            'capacity' => 'sometimes|required|integer',
            'price_per_day' => 'sometimes|required|numeric',
            'status' => 'sometimes|required|in:available,maintenance,booked'
        ]);

        $boat->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Data Kapal berhasil diperbarui!',
            'data'    => $boat
        ]);
    }

    public function destroy($id)
    {
        $boat = Boat::find($id);
        if (!$boat) {
            return response()->json(['success' => false, 'message' => 'Data Kapal tidak ditemukan'], 404);
        }

        $boat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data Kapal berhasil dihapus!'
        ]);
    }
}