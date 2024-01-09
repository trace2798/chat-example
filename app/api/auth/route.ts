import { cookies } from "next/headers"
import * as Ably from "ably"

import { getSession } from "@/lib/session"

export async function GET(request: Request) {
  const session = await getSession(cookies())
  const ably = new Ably.Rest.Promise({ key: process.env.ABLY_API_KEY! })
  const token = await ably.auth.createTokenRequest({
    clientId: session.username!,
    capability: {
      "conversations:*": ["publish", "subscribe", "presence"],
    },
  })
  console.error(token)
  return Response.json(token)
}
