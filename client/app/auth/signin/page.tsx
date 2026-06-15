"use client";
import React from "react";
import {useState} from "react";
import useRequest from "../../../hooks/user-request";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const Router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
  });

const onSubmit = async (e: React.FormEvent) => {

  e.preventDefault();
  
await doRequest();
Router.push("/");
    
};
  return (
    <div>
      <h1>Signin Page</h1>
     <form onSubmit={onSubmit}>
        
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
{errors}
        
        <button type="submit">Sign In</button>
     </form>
    </div>
  );
}