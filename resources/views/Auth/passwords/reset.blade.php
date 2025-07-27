@extends('layouts.app')

@section('title', 'Reset Password')

@section('content')
<div class="login-page d-flex align-items-center justify-content-center" style="min-height: 100vh; background-color: #363535;">

    <div class="card shadow p-4"
        style="max-width: 400px; width: 100%; border-radius: 16px; background-color: #ffffff">
        <h2 class="mb-4 text-center">Reset Password</h2>

        @if (session('status'))
            <div class="alert alert-success">{{ session('status') }}</div>
        @endif

        <form method="POST" action="{{ route('password.update') }}">
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">

            <div class="mb-3">
                <label for="password" class="form-label">Password Baru</label>
                <input id="password" type="password"
                    class="form-control @error('password') is-invalid @enderror" name="password" required
                    autofocus>
                @error('password')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="password-confirm" class="form-label">Konfirmasi Password Baru</label>
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation"
                    required>
                <div id="password-match-message" class="text-danger mt-1" style="display: none;">
                    Passwords do not match.
                </div>
            </div>

            <button type="submit" class="btn btn-dark w-100">Reset Password</button>
        </form>
    </div>
</div>
@endsection
