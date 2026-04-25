<?php

namespace App\Http\Controllers;

use App\Models\Homestay;
use Illuminate\Http\Request;

class HomestayController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Homestay::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'total_rooms' => 'required|integer',
            'price_per_night' => 'required|numeric'
        ]);

        $homestay = Homestay::create([
            'name' => $request->name,
            'total_rooms' => $request->total_rooms,
            'price_per_night' => $request->price_per_night,
            'status' => 'available'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Homestay berhasil ditambahkan!',
            'data' => $homestay
        ], 201);
    }

    public function show($id)
    {
        $homestay = Homestay::find($id);
        if (!$homestay) return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);
        return response()->json(['success' => true, 'data' => $homestay]);
    }

    public function update(Request $request, $id)
    {
        $homestay = Homestay::find($id);
        if (!$homestay) return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);

        $homestay->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Homestay berhasil diperbarui!',
            'data' => $homestay
        ]);
    }

    public function destroy($id)
    {
        $homestay = Homestay::find($id);
        if (!$homestay) return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);
        
        $homestay->delete();
        
        return response()->json(['success' => true, 'message' => 'Homestay berhasil dihapus!']);
    }
}