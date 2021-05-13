<?php

namespace FireflyIII\Http\Controllers;

use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function index()
    {
        return view('v1.onboarding.index');
    }

}
