import { jwtVerify, JWTPayload, JWTVerifyResult } from "jose";

interface CustomJWTPayload extends JWTPayload {
    username?: string;
    // Add any other custom fields your JWT payload might have
}

export async function verifyToken(token: string, secret: string): Promise<CustomJWTPayload> {
    try {
        const encoder = new TextEncoder();
        const secretBuffer = encoder.encode(secret);

        const { payload } = await jwtVerify(token, secretBuffer);
        return payload as CustomJWTPayload;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid token");
    }
}

export function isTokenExpired(payload: CustomJWTPayload): boolean {
    if (!payload.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
}

async function offlineLogin(username: string, password: string) {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode("lllllllll"));
        const storedUsername = payload.username as string;
        const storedPasswordHash = payload.passwordHash as string;
    } catch (error) {
        console.error("Offline login failed:", error);
        return false;
    }
}
