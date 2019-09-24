<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Cocur\Slugify\Slugify;

class GroupController extends Controller
{
    public function index($slug = false) {
        return response()->json($slug ? Group::getBySlug($slug) : Group::all());
    }

    public function store(Request $request)
    {
        $validator = Group::validate($request);

        if (!$validator->fails()) {
            $group = new Group;
            $group->fill(Group::getFillableProps($request));
            $group->save();

            return response()->json([
                "result" => true,
                "group" => $group
            ]);
        } else {
            return response()->json([
                "result" => false,
                "errors" => $validator->errors()
            ]);
        }
    }

    public function delete(Request $request, $id)
    {
        return response()->json([
            "result" => Group::findAndDelete($id)
        ]);
    }
}
