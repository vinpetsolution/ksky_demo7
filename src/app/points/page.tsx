"use client";

import { useState, useCallback } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Table, { type Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { BANNER_VIDEOS } from "@/mocks/slides";
import { formatNumber } from "@/utils/format";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";

const PRESET_AMOUNTS = [
    { label: "1만", value: 10000 },
    { label: "3만", value: 30000 },
    { label: "5만", value: 50000 },
    { label: "10만", value: 100000 },
    { label: "50만", value: 500000 },
    { label: "100만", value: 1000000 },
    { label: "500만", value: 5000000 },
];

interface PointTransferRecord {
    id: string;
    amount: number;
    type: string;
    status: string;
    requestDate: string;
    processDate: string;
}

const POINT_COLUMNS: Column<PointTransferRecord>[] = [
    {
        key: "amount",
        label: "금액",
        align: "center",
        render: (row) => formatNumber(row.amount),
    },
    {
        key: "type",
        label: "종류",
        align: "center",
    },
    {
        key: "status",
        label: "상태",
        align: "center",
        render: (row) => {
            const statusMap: Record<string, { text: string; className: string }> = {
                COMPLETED: { text: "완료", className: "text-green-700" },
                PENDING: { text: "대기중", className: "text-gold-deep" },
                CANCELLED: { text: "취소", className: "text-red-700" },
            };
            const statusInfo = statusMap[row.status] || { text: row.status, className: "" };
            return <span className={statusInfo.className}>{statusInfo.text}</span>;
        },
    },
    {
        key: "requestDate",
        label: "신청 날짜",
        align: "center",
    },
    {
        key: "processDate",
        label: "처리 날짜",
        align: "center",
    },
];

const PointsPage = () => {
    const { currentUser } = useUser();
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState("0");
    const [loading, setLoading] = useState(false);

    const availablePoint = currentUser?.result?.user?.balancePoint || 0;
    const availableMoney = currentUser?.result?.user?.balanceMoney || 0;

    const transferUnit = 10000;
    const minAmount = 10000;
    const tableData: PointTransferRecord[] = [];
    const totalPages = 1;
    const totalCount = 0;
    const currentPage = 1;

    const calculateActualTransferAmount = (inputAmount: number): number => {
        if (transferUnit > 1) {
            return Math.floor(inputAmount / transferUnit) * transferUnit;
        }
        return inputAmount;
    };

    const actualTransferAmount = calculateActualTransferAmount(amount);
    const remainingPoint = amount - actualTransferAmount;

    const handlePresetClick = (value: number) => {
        const next = Math.min(amount + value, availablePoint);
        setAmount(next);
        setAmountInput(String(next));
    };

    const handleMaxAmount = () => {
        setAmount(availablePoint);
        setAmountInput(String(availablePoint));
    };

    const handleReset = () => {
        setAmount(0);
        setAmountInput("0");
    };

    const handleSubmit = useCallback(async () => {
        if (minAmount > 0 && amount < minAmount) {
            toast.error(`최소 전환 금액은 ${formatNumber(minAmount)}원입니다.`);
            return;
        }

        if (amount > availablePoint) {
            toast.error("보유 포인트보다 많이 전환할 수 없습니다.");
            return;
        }

        if (actualTransferAmount <= 0) {
            toast.error(transferUnit > 1
                ? `전환 단위는 ${formatNumber(transferUnit)}원입니다. 최소 ${formatNumber(transferUnit)} 포인트 이상 필요합니다.`
                : "전환할 포인트가 없습니다.");
            return;
        }

        setLoading(true);
        toast.success(`${formatNumber(actualTransferAmount)} 포인트를 머니로 전환했습니다.`);
        handleReset();
        setLoading(false);
    }, [amount, actualTransferAmount, availablePoint, minAmount, transferUnit]);

    const handlePageChange = () => { };

    return (
        <AuthGuard>
            <HeroCarousel videos={BANNER_VIDEOS} />
            <div className="px-0 md:px-5 flex flex-col w-full">
                {/* Header */}
                <div
                    className="flex flex-col w-full pt-px lg:flex-row"
                    style={{ marginLeft: "-1px" }}
                >
                    <div className="hidden lg:flex h-50 w-81.25 shrink-0 flex-col justify-center bg-[#fffcf7cc] backdrop-blur-[5px]">
                        <span className="block pr-10 text-right text-[40px] font-extralight text-gray">
                            포인트
                        </span>
                        <span className="-mt-4 block pr-10 text-right text-[40px] font-normal text-gray">
                            전환 방법
                        </span>
                    </div>
                    <div
                        className="flex min-h-30 py-6 px-5 min-w-0 flex-1 flex-col justify-center bg-[#fffcf7cc] backdrop-blur-[5px] lg:h-50 lg:py-0 lg:px-0"
                        style={{ marginRight: "1px" }}
                    >
                        <div className="space-y-1 pl-5 text-sm leading-[1.6] text-gray lg:pl-10 lg:text-[15px]">
                            {minAmount > 0 && (
                                <p>포인트 금액이 {formatNumber(minAmount)}원 이상일때만 보유머니로 전환가능합니다.</p>
                            )}
                            {transferUnit > 1 && (
                                <p>전환 단위는 {formatNumber(transferUnit)}원 입니다. (예: {formatNumber(transferUnit + 200)} 포인트 → {formatNumber(transferUnit)} 전환, 200 남음)</p>
                            )}
                            <p>전환된 포인트는 즉시 보유머니에 반영됩니다.</p>
                        </div>
                    </div>
                </div>

                {/* Title bar */}
                <div
                    className="relative z-10 mb-px flex h-12 shrink-0 items-center bg-cream md:h-15.5"
                    style={{
                        backgroundImage: "url('/images/title_effect_overlay.png')",
                        backgroundPosition: "left",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <span
                        className="ml-3 block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold leading-12 text-gray md:ml-5 md:text-base md:leading-15.5"
                    >
                        포인트 전환
                    </span>
                </div>

                {/* User info grid */}
                <div className="grid gap-px w-full grid-cols-1 lg:grid-cols-2">
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-cream mr-px text-gray leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            현재 보유포인트
                        </label>
                        <div className="bg-panel relative flex-1 flex items-center px-2.5">
                            <span className="text-[#a6842e]">{formatNumber(availablePoint)} P</span>
                        </div>
                    </div>
                    <div className="flex w-full h-11 md:h-12.5">
                        <label className="w-25 text-xs bg-cream mr-px text-gray leading-11 text-center shrink-0 md:w-37.5 md:text-[15px] md:leading-12.5">
                            보유머니
                        </label>
                        <div className="bg-panel relative flex-1 flex items-center px-2.5">
                            <span className="text-[#a6842e]">{formatNumber(availableMoney)} 원</span>
                        </div>
                    </div>
                </div>

                {/* Money Box */}
                <div className="min-h-20 bg-cream mt-px p-2 md:min-h-25 md:p-5">
                    <div className="h-full border border-line px-2 py-2 flex items-center justify-between md:px-5 md:py-4">
                        <span className="text-sm font-bold text-gray shrink-0 md:text-[26px]">전환금액</span>
                        <div className="flex min-w-0 items-center flex-1 pl-2 md:pl-10">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={amountInput ? formatNumber(Number(amountInput)) : amountInput}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/[^0-9]/g, "");
                                    const numVal = v ? Number(v) : 0;
                                    const clampedVal = Math.min(numVal, availablePoint);
                                    setAmountInput(String(clampedVal));
                                    setAmount(clampedVal);
                                }}
                                disabled={loading}
                                placeholder={minAmount > 0
                                    ? `최소 ${formatNumber(minAmount)}원`
                                    : '금액을 입력하세요'}
                                className="flex-1 min-w-0 bg-transparent text-right text-xl text-[#a6842e] font-rajdhani outline-none placeholder:text-gray placeholder:text-xs md:text-12.5 md:placeholder:text-xl"
                            />
                            <span className="shrink-0 pl-1 text-lg font-normal text-gray md:pl-4 md:text-4xl">P</span>
                        </div>
                    </div>
                </div>

                {/* Transfer Info */}
                {amount > 0 && transferUnit > 1 && (
                    <div className="bg-panel p-3 mt-px text-sm">
                        <div className="flex justify-between text-gray">
                            <span>입력 포인트:</span>
                            <span className="text-[#a6842e]">{formatNumber(amount)} P</span>
                        </div>
                        <div className="flex justify-between text-gray mt-1">
                            <span>실제 전환 금액 ({formatNumber(transferUnit)}원 단위):</span>
                            <span className="text-green-700 font-semibold">{formatNumber(actualTransferAmount)} 원</span>
                        </div>
                        {remainingPoint > 0 && (
                            <div className="flex justify-between text-gray mt-1">
                                <span>전환 후 남는 포인트:</span>
                                <span className="text-gold-deep">{formatNumber(remainingPoint)} P</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Preset amount buttons */}
                <div className="mt-px grid grid-cols-12 gap-px overflow-hidden md:grid-cols-7">
                    {PRESET_AMOUNTS.map(({ label, value }, i) => (
                        <Button
                            key={value}
                            type="button"
                            variant="transparent"
                            onClick={() => handlePresetClick(value)}
                            disabled={loading || (amount + value) > availablePoint}
                            className={`bg-cream hover:text-[#a6842e]/80 rounded-none py-2 text-center h-11 text-xs font-semibold text-[#a6842e] hover:bg-[#f8f1e4] md:py-3 md:h-12.5 md:text-[15px] md:col-span-1 disabled:opacity-50 ${i < 4 ? "col-span-3" : "col-span-4"}`}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
                <div className="w-full h-11 bg-cream flex justify-center items-center gap-px md:h-12.5">
                    <Button
                        variant="transparent"
                        onClick={handleMaxAmount}
                        disabled={loading || availablePoint <= 0}
                        className="flex-1 h-full font-medium rounded-none text-[15px] bg-line text-[#a6842e] hover:text-[#a6842e]/80 hover:bg-gold-border disabled:opacity-50"
                    >
                        MAX
                    </Button>
                    <Button
                        variant="transparent"
                        onClick={handleReset}
                        disabled={loading}
                        className="flex-1 h-full font-medium rounded-none text-[15px] bg-line text-[#a6842e] hover:text-[#a6842e]/80 hover:bg-gold-border"
                    >
                        정정하기
                    </Button>
                </div>
                <Button
                    variant="red"
                    onClick={handleSubmit}
                    disabled={loading || (minAmount > 0 && availablePoint < minAmount)}
                    className="mt-px w-full text-base font-normal h-20 rounded-none text-white px-6 md:text-lg md:h-25 md:px-12.5 disabled:opacity-50"
                >
                    {loading ? "처리중..." : "포인트 전환"}
                </Button>

                {/* Point transfer history table */}
                <div className="mt-5 pb-10">
                    <div className="overflow-x-auto">
                        <div className="min-w-150">
                            <Table<PointTransferRecord>
                                title={`포인트전환내역 (${totalCount})`}
                                columns={POINT_COLUMNS}
                                data={tableData}
                            />
                        </div>
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AuthGuard>
    );
};

export default PointsPage;
