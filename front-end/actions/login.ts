"use server";

import * as z from "zod";
import { cookies } from "next/headers";
import { LoginSchema } from "@/schemas/userschema";

export const login = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    // Prepare the request data in the format expected by the FastAPI login endpoint
    const request_form_data = new FormData();
    request_form_data.append("username", email);  // 'username' is used instead of 'email' based on OAuth2PasswordRequestForm
    request_form_data.append("password", password);

    // Make a POST request to the FastAPI login endpoint
    const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/user/login`, {
      method: "POST",
      body: request_form_data,
      cache: "no-store",
    });

    if (!response || response.status !== 200) {
      throw new Error(response.statusText);
    };

    const token_data = await response.json();

    // Extract the token expiration time and calculate when it expires
    const accessToken = token_data.access_token;
    const tokenType = token_data.token_type;

    const updated_user_data = {
      accessToken,
      tokenType,
      accessTokenExpires: Date.now() + 3600 * 1000, // Assuming the token expires in 1 hour
    };

    console.log("Login Request Response To Set in Cookies");

    // Store the user data in a cookie
    cookies().set({
      name: "user_data",
      value: JSON.stringify(updated_user_data),
      httpOnly: true,
    });

    return { success: "Authenticated!", message: `Welcome back!` };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Invalid credentials!", message: error.message };
    }
    return { error: "Invalid credentials!", message: "Invalid credentials!" };
  }
};
