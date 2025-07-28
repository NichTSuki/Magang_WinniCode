@extends('layouts.auth')

@section('title', 'Register')
@section('heading', 'Sign up')

@section('content')
<form method="POST" action="{{ route('register') }}">
    @csrf
    <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
            name="name" placeholder="Your full name" value="{{ old('name') }}" required>
        @error('name')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

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
        <input type="password" class="form-control @error('password') is-invalid @enderror" id="password"
            name="password" placeholder="********" required>
        @error('password')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <div class="mb-3">
        <label for="password_confirmation" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="password_confirmation" name="password_confirmation"
            placeholder="********" required>
        <div id="password-match-message" class="text-danger mt-1" style="display: none;">
            Passwords do not match.
        </div>
    </div>

    <div class="d-flex gap-2">
        <a href="{{ url('/') }}" class="btn btn-outline-secondary w-100">Cancel</a>
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
    </div>
</form>

<p class="text-center mt-3">
    Sudah punya akun? <a href="{{ route('login') }}">Login</a>
</p>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('password_confirmation');
        const messageDiv = document.getElementById('password-match-message');
        const submitButton = document.querySelector('button[type="submit"]');

        function validatePasswords() {
            if (passwordInput.value && confirmInput.value) {
                if (passwordInput.value !== confirmInput.value) {
                    messageDiv.style.display = 'block';
                    messageDiv.textContent = 'Passwords do not match.';
                    confirmInput.classList.add('is-invalid');
                    submitButton.disabled = true;
                } else {
                    messageDiv.style.display = 'none';
                    confirmInput.classList.remove('is-invalid');
                    submitButton.disabled = false;
                }
            } else {
                messageDiv.style.display = 'none';
                confirmInput.classList.remove('is-invalid');
                submitButton.disabled = false;
            }
        }

        passwordInput.addEventListener('input', validatePasswords);
        confirmInput.addEventListener('input', validatePasswords);
    });
</script>
@endsection
