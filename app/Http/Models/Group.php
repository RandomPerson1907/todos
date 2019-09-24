<?php

namespace App\Models;

use Cocur\Slugify\Slugify;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

class Group extends Model
{
    protected $fillable = ["title", "slug"];

    public static function getValidatorMessages()
    {
        return [
            'required'  => 'Не введено имя группы',
            'unique'    => 'Группа с таким именем уже существует',
            'max'       => 'Имя слишком длинное'
        ];
    }

    public static function validate(\Illuminate\Http\Request $request)
    {
        return Validator::make($request->all(), [
            'title' => 'required|unique:groups|max:191',
        ], self::getValidatorMessages());
    }

    public static function getFillableProps(\Illuminate\Http\Request $request)
    {
        return array_merge($request->all(), ["slug" => self::toSlug($request->title)]);
    }

    public static function toSlug($string)
    {
        return (new Slugify)->slugify($string);
    }

    public static function getBySlug(string $slug)
    {
        try {
            return self::where("slug", "=", $slug)->firstOrFail();
        } catch (ModelNotFoundException $message) {
            return false;
        }
    }

    public static function findAndDelete($id)
    {
        try {
            return self::findOrFail($id)->delete();
        } catch (ModelNotFoundException $message) {
            return true;
        }
    }
}
