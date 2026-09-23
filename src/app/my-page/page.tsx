"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { BANNER_VIDEOS } from "@/mocks/slides";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";

const MyPage = () => {
    const { currentUser } = useUser();
    const user = currentUser?.result?.user;

    const [nickname, setNickname] = useState(user?.nickName ?? "");
    const [bankName, setBankName] = useState(user?.bankName ?? "");
    const [bankHolder, setBankHolder] = useState(user?.bankHolder ?? "");
    const [bankNo, setBankNo] = useState(user?.bankNo ?? "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = useCallback(async () => {
        if (!user?.userName) return;

        if (newPassword && newPassword !== confirmPassword) {
            toast.error("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (newPassword && !currentPassword) {
            toast.error("기존 비밀번호를 입력해주세요.");
            return;
        }

        if (newPassword && newPassword.length < 4) {
            toast.error("비밀번호는 최소 4자 이상이어야 합니다.");
            return;
        }

        setSaving(true);
        toast.success("정보가 성공적으로 변경되었습니다.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSaving(false);
    }, [user, currentPassword, newPassword, confirmPassword]);

    return (
        <AuthGuard>
            <HeroCarousel videos={BANNER_VIDEOS} />
            <div className="flex w-full flex-col px-0 pb-10 md:px-5">
                {/* Header */}
                <div className="flex w-full flex-col pt-px lg:flex-row" style={{ marginLeft: "-1px" }}>
                    <div className="hidden h-50 w-81.25 shrink-0 flex-col justify-center bg-[#fffcf7cc] backdrop-blur-[5px] lg:flex">
                        <span className="block pr-10 text-right text-[40px] font-extralight text-gray">
                            나의
                        </span>
                        <span className="-mt-4 block pr-10 text-right text-[40px] font-normal text-gray">
                            정보 관리
                        </span>
                    </div>
                    <div
                        className="flex min-h-30 min-w-0 flex-1 flex-col justify-center bg-[#fffcf7cc] px-5 py-6 backdrop-blur-[5px] lg:h-50 lg:px-0 lg:py-0"
                        style={{ marginRight: "1px" }}
                    >
                        <div className="space-y-1 pl-5 text-sm leading-[1.6] text-gray lg:pl-10 lg:text-[15px]">
                            <p>닉네임, 은행 정보, 비밀번호를 변경할 수 있습니다.</p>
                            <p>비밀번호 변경 시 기존 비밀번호를 입력해야 합니다.</p>
                        </div>
                    </div>
                </div>

                {/* Title bar */}
                <div className="relative z-10 mb-px flex h-12 shrink-0 items-center bg-cream md:h-15.5">
                    <span
                        className="ml-3 block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold leading-12 text-gray md:ml-5 md:text-base md:leading-15.5"
                    >
                        회원정보
                    </span>
                </div>

                {/* User info grid */}
                <div className="grid w-full grid-cols-1 gap-px">
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-xs leading-tight text-gray md:w-37.5 md:text-[15px] md:leading-12.5">
                            아이디
                        </label>
                        <div className="relative flex flex-1 items-center bg-panel px-2.5">
                            <span className="text-[#a6842e]">{user?.userName ?? ""}</span>
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-xs leading-tight text-gray md:w-37.5 md:text-[15px] md:leading-12.5">
                            닉네임
                        </label>
                        <div className="relative flex flex-1 justify-center bg-panel">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full bg-transparent px-2 text-right text-sm text-[#a6842e] outline-none placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-xs leading-tight text-gray md:w-37.5 md:text-[15px] md:leading-12.5">
                            예금주
                        </label>
                        <div className="relative flex flex-1 justify-center bg-panel">
                            <input
                                type="text"
                                value={bankHolder}
                                onChange={(e) => setBankHolder(e.target.value)}
                                className="w-full bg-transparent px-2 text-right text-sm text-[#a6842e] outline-none placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-xs leading-tight text-gray md:w-37.5 md:text-[15px] md:leading-12.5">
                            은행명
                        </label>
                        <div className="relative flex flex-1 justify-center bg-panel">
                            <input
                                type="text"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full bg-transparent px-2 text-right text-sm text-[#a6842e] outline-none placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-xs leading-tight text-gray md:w-37.5 md:text-[15px] md:leading-12.5">
                            계좌번호
                        </label>
                        <div className="relative flex flex-1 justify-center bg-panel">
                            <input
                                type="text"
                                value={bankNo}
                                onChange={(e) => setBankNo(e.target.value)}
                                className="w-full bg-transparent px-2 text-right text-sm text-[#a6842e] outline-none placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>

                    {/* Password section title */}
                    <div className="relative z-10 mt-3 mb-px flex h-12 shrink-0 items-center bg-cream md:h-15.5">
                        <span
                            className="ml-3 block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold leading-12 text-gray md:ml-5 md:text-base md:leading-15.5"
                        >
                            비밀번호 변경
                        </span>
                    </div>

                    <div className="flex min-h-11 w-full items-stretch md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-[10px] leading-tight text-gray sm:text-xs md:w-37.5 md:text-[15px] md:leading-12.5">
                            기존 비밀번호
                        </label>
                        <div className="relative flex flex-1 items-center bg-panel px-2 md:px-2.5">
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="기존 비밀번호"
                                className="w-full bg-transparent text-right text-xl text-[#a6842e] outline-none placeholder:text-xs placeholder:tracking-widest placeholder:text-[#A89884] md:text-2xl md:placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex min-h-11 w-full items-stretch md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-[10px] leading-tight text-gray sm:text-xs md:w-37.5 md:text-[15px] md:leading-12.5">
                            변경할 비밀번호
                        </label>
                        <div className="relative flex flex-1 items-center bg-panel px-2 md:px-2.5">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="변경할 비밀번호"
                                className="w-full bg-transparent text-right text-xl text-[#a6842e] outline-none placeholder:text-xs placeholder:tracking-widest placeholder:text-[#A89884] md:text-2xl md:placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex min-h-11 w-full items-stretch md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-cream px-0.5 text-center text-[10px] leading-tight text-gray sm:text-xs md:w-37.5 md:text-[15px] md:leading-12.5">
                            비밀번호확인
                        </label>
                        <div className="relative flex flex-1 items-center bg-panel px-2 md:px-2.5">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="비밀번호확인"
                                className="w-full bg-transparent text-right text-lg text-[#a6842e] outline-none placeholder:text-xs placeholder:tracking-widest placeholder:text-[#A89884] md:text-2xl md:placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <Button
                        variant="red"
                        onClick={handleSubmit}
                        disabled={saving}
                        className="mt-px h-20 w-full rounded-none px-6 text-base font-normal text-white disabled:opacity-50 md:h-25 md:px-12.5 md:text-lg"
                    >
                        {saving ? "처리중..." : "변경하기"}
                    </Button>
                </div>
            </div>
        </AuthGuard>
    );
};

export default MyPage;
