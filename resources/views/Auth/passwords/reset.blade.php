<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Winnews</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
</head>

<body style="background-color: #363535;">
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

            <button type="submit" class="btn btn-primary w-100">Reset Password</button>
        </form>
    </div>
</div>

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
</body>
