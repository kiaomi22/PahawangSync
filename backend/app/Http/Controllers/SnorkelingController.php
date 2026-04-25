<?php

namespace App\Http\Controllers;

use App\Models\Snorkeling;
use Illuminate\Http\Request;

class SnorkelingController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Snorkeling::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|integer',
            'price_per_day' => 'required|numeric'
        ]);

        $snorkeling = Snorkeling::create([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'price_per_day' => $request->price_per_day,
            'status' => 'available'
        ]);

        return response()->json(['success' => true, 'message' => 'Alat berhasil ditambahkan!', 'data' => $snorkeling], 201);
    }

    public function show($id)
    {
        $snorkeling = Snorkeling::find($id);
        if (!$snorkeling) return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);
        return response()->json(['success' => true, 'data' => $snorkeling]);
    }

    public function update(Request $request, $id)
    {
        $snorkeling = Snorkeling::find($id);
        if (!$snorkeling) return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);

        $snorkeling->update($request->all());
        return response()->json(['success' => true, 'message' => 'Alat berhasil diperbarui!', 'data' => $snorkeling]);
    }

    public function destroy($id)
    {
        $snorkeling = Snorkeling::find($id);
        if (!$snorkeling) return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);
        
        $snorkeling->delete();
        return response()->json(['success' => true, 'message' => 'Alat berhasil dihapus!']);
    }
}