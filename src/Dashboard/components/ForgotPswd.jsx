import React from 'react';
import '../../css/forgot.css'
const ForgotPswd = () => {
    return (
        <div className='flex-center'>
<div class="form-container">
      <div class="logo-container">
        Forgot Password
      </div>

      <form class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" required="" />
        </div>

        <button class="form-submit-btn" type="submit">Send Email</button>
      </form>

      <p class="signup-link">
        Don't have an account?
        <a href="/Register" class="signup-link link"> Sign up now</a>
      </p>
    </div>
        </div>
    );
}

export default ForgotPswd;
