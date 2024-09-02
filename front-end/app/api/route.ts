import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch("localhost:8000", {method: "GET"});
  return 
}
