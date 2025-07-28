@extends('layouts.auth')

@section('title', 'Reset Password')
@section('heading', 'Reset Password')

@section('content')
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

    <button type="submit" class="btn btn-primary w-100">Reset Password</button>
</form>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('password-confirm');
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
