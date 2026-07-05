"use client";

import React, { useState } from "react";
import Link from "next/link";
import useRequest from "../../../hooks/user-request";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors, isLoading } = useRequest({
    url: "/api/users/signin",
    method: "post",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await doRequest({ email, password });
    if (result) {
      window.location.href = "/";
    }
  };

  return (
    <div className="page-container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="card w-full max-w-md">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-brand-700 hover:text-brand-800">
            Sign up
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          {errors.length > 0 && (
            <ul className="error-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
