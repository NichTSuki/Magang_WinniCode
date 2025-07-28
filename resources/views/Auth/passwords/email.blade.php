@extends('layouts.auth')

@section('title', 'Lupa Password')
@section('heading', 'Lupa Password')

@section('description')
<p class="text-center text-muted mb-4">
    Masukkan alamat email Anda dan kami akan mengirimkan link untuk mereset password Anda.
</p>
@endsection

@section('content')
<form method="POST" action="{{ route('password.email') }}">
    @csrf

    <div class="mb-3">
        <label for="email" class="form-label">Alamat Email</label>
        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
            name="email" value="{{ old('email') }}" required autofocus placeholder="name@gmail.com">
        @error('email')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <div class="d-flex gap-2">
        <a href="{{ url('login') }}" class="btn btn-outline-secondary w-100">Back</a>
        <button type="submit" class="btn btn-primary w-100">Send Reset Link</button>
    </div>
</form>
@endsection
