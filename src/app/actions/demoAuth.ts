"use server";

import type { AuthResponse, User } from "@/types";

function emptyAuth(message: string): AuthResponse {
  return {
    success: false,
    message,
    result: {
      token: "",
      user: {
        id: "",
        userName: "",
        nickName: "",
        role: "USER",
        balanceMoney: 0,
        balancePoint: 0,
        balancePot: 0,
      },
    },
  };
}

export async function demoLogin(
  userName: string,
  password: string,
): Promise<AuthResponse> {
  const expectedUser = process.env.DEMO_USERNAME ?? "";
  const expectedPass = process.env.DEMO_PASSWORD ?? "";
  const inputUser = userName.trim();

  if (!expectedUser || !expectedPass) {
    return emptyAuth("로그인에 실패했습니다.");
  }

  if (inputUser !== expectedUser || password !== expectedPass) {
    return emptyAuth("아이디 또는 비밀번호가 올바르지 않습니다.");
  }

  const user: User = {
    id: "demo-user",
    userName: expectedUser,
    nickName: "testuser",
    role: "USER",
    balanceMoney: 0,
    balancePoint: 0,
    balancePot: 0,
    bankHolder: "홍길동",
    bankName: "KB국민은행",
    bankNo: "123-456-789012",
  };

  return {
    success: true,
    message: "로그인 성공",
    deviceId: "demo-device",
    result: {
      token: "demo-session",
      user,
    },
  };
}
