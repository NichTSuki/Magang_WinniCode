@extends('layouts.auth')

@section('title', 'Login')
@section('heading', 'Sign in')

@section('content')
<form method="POST" action="{{ route('login.post') }}">
    @csrf

    <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control @error('email') is-invalid @enderror" id="email"
            name="email" placeholder="name@gmail.com" value="{{ old('email') }}" required>
        @error('email')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password"
            placeholder="********" required>
    </div>

    {{-- 🔗 Tombol Lupa Password --}}
    <div class="mb-3 text-end">
        <a href="{{ route('password.request') }}" class="text-decoration-none text-sm">
            Lupa password?
        </a>
    </div>

    <div class="d-flex gap-2">
        <a href="{{ url('/') }}" class="btn btn-outline-secondary w-100">Cancel</a>
        <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </div>
</form>

<p class="text-center mt-3">
    Belum punya akun? <a href="{{ route('register') }}">Register</a>
</p>
@endsection
