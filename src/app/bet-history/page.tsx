"use client";

import { useState, useMemo } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Table, { type Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { BANNER_VIDEOS } from "@/mocks/slides";
import { formatNumber } from "@/utils/format";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { DEMO_BET_HISTORY } from "@/mocks/betHistory";

type BetTab = "casino" | "slot";

const TAB_CATEGORY: Record<BetTab, string> = {
    casino: "Live Casino",
    slot: "Slot",
};

const PAGE_SIZE = 10;

const DEFAULT_START_DATE = "2026-09-10";
const DEFAULT_END_DATE = "2026-09-17";

function formatBetDate(iso: string) {
    return iso.replace("T", " ").slice(0, 16);
}

function resultLabel(r: string) {
    switch (r) {
        case "Win": return "당첨";
        case "Lose": return "미당첨";
        case "Bet": return "진행중";
        case "Draw": return "무승부";
        default: return r;
    }
}

function resultClassName(r: string) {
    switch (r) {
        case "Win": return "text-green-700 font-semibold";
        case "Lose": return "text-red-700 font-semibold";
        case "Bet": return "text-gold-deep font-semibold";
        case "Draw": return "text-blue-700 font-semibold";
        default: return "text-gray";
    }
}

interface BetRecord {
    id: string;
    gameName: string;
    gameCategory: string;
    betAmount: number;
    winAmount: number;
    result: string;
    date: string;
}

const BET_COLUMNS: Column<BetRecord>[] = [
    {
        key: "gameName",
        label: "게임",
        align: "center",
    },
    {
        key: "gameCategory",
        label: "카테고리",
        align: "center",
    },
    {
        key: "betAmount",
        label: "베팅금",
        align: "center",
        render: (row) => (
            <span className="text-[#a6842e]">{formatNumber(row.betAmount)}</span>
        ),
    },
    {
        key: "winAmount",
        label: "당첨금",
        align: "center",
        render: (row) => (
            <span className="text-green-700">{formatNumber(row.winAmount)}</span>
        ),
    },
    {
        key: "result",
        label: "결과",
        align: "center",
        render: (row) => (
            <span className={resultClassName(row.result)}>
                {resultLabel(row.result)}
            </span>
        ),
    },
    {
        key: "date",
        label: "일시",
        align: "center",
    },
];

const BetHistoryPage = () => {
    const [activeTab, setActiveTab] = useState<BetTab>("casino");
    const [filterResult, setFilterResult] = useState("");

    const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
    const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = useMemo(() => {
        return DEMO_BET_HISTORY.filter((item) => {
            if (item.gameCategory !== TAB_CATEGORY[activeTab]) return false;
            if (filterResult && item.result !== filterResult) return false;
            const day = item.createdAt.slice(0, 10);
            return day >= startDate && day <= endDate;
        });
    }, [activeTab, filterResult, startDate, endDate]);

    const totalCount = filteredItems.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
    const items = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const loading = false;

    const handleTabChange = (tab: BetTab) => {
        setActiveTab(tab);
        setFilterResult("");
        setCurrentPage(1);
    };

    const tableData: BetRecord[] = useMemo(() => {
        return items.map((item) => ({
            id: item._id,
            gameName: item.gameName,
            gameCategory: item.gameCategory,
            betAmount: item.betAmount,
            winAmount: item.winAmount,
            result: item.result,
            date: formatBetDate(item.createdAt),
        }));
    }, [items]);

    return (
        <AuthGuard>
            <HeroCarousel videos={BANNER_VIDEOS} />
            <div className="flex w-full flex-col px-0 pb-10 md:px-5">
                {/* Header */}
                <div className="flex w-full flex-col pt-px lg:flex-row" style={{ marginLeft: "-1px" }}>
                    <div className="hidden h-50 w-81.25 shrink-0 flex-col justify-center bg-[#fffcf7cc] backdrop-blur-[5px] lg:flex">
                        <span className="block pr-10 text-right text-[40px] font-extralight text-gray">
                            베팅
                        </span>
                        <span className="-mt-4 block pr-10 text-right text-[40px] font-normal text-gray">
                            내역 조회
                        </span>
                    </div>
                    <div
                        className="flex min-h-30 min-w-0 flex-1 flex-col justify-center bg-[#fffcf7cc] px-5 py-6 backdrop-blur-[5px] lg:h-50 lg:px-0 lg:py-0"
                        style={{ marginRight: "1px" }}
                    >
                        <div className="space-y-1 pl-5 text-sm leading-[1.6] text-gray lg:pl-10 lg:text-[15px]">
                            <p>사이트 및 회원님의 보안을 위해 7일이 지난 베팅 내역은 자동 삭제 처리됩니다.</p>
                            <p>날짜를 선택하여 원하는 기간의 베팅 내역을 조회할 수 있습니다.</p>
                        </div>
                    </div>
                </div>

                {/* Tab Buttons */}
                <div className="mt-px grid grid-cols-2 gap-px">
                    {([
                        { key: "casino" as BetTab, label: "카지노 베팅내역" },
                        { key: "slot" as BetTab, label: "슬롯 베팅내역" },
                    ]).map((t) => (
                        <Button
                            key={t.key}
                            type="button"
                            variant="transparent"
                            onClick={() => handleTabChange(t.key)}
                            className={`h-12 rounded-none text-sm font-semibold md:h-15.5 md:text-base ${activeTab === t.key
                                    ? "bg-cream text-[#a6842e]"
                                    : "bg-panel text-gray hover:bg-[#f8f1e4] hover:text-[#a6842e]/80"
                                }`}
                        >
                            {t.label}
                        </Button>
                    ))}
                </div>

                {/* Filter / Date bar */}
                <div className="mt-px flex flex-wrap items-center gap-2 bg-cream p-3 md:gap-4 md:p-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="h-9 rounded border border-line bg-panel px-2 text-xs text-gray outline-none focus:border-[#a6842e] md:h-10 md:px-3 md:text-sm"
                        />
                        <span className="text-gray">~</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="h-9 rounded border border-line bg-panel px-2 text-xs text-gray outline-none focus:border-[#a6842e] md:h-10 md:px-3 md:text-sm"
                        />
                    </div>
                    <select
                        value={filterResult}
                        onChange={(e) => setFilterResult(e.target.value)}
                        className="h-9 rounded border border-line bg-panel px-2 text-xs text-gray outline-none focus:border-[#a6842e] md:h-10 md:px-3 md:text-sm"
                    >
                        <option value="">전체</option>
                        <option value="Win">당첨</option>
                        <option value="Lose">미당첨</option>
                        <option value="Bet">진행중</option>
                    </select>
                    <span className="text-xs text-gray md:text-sm">
                        총 {totalCount}건
                    </span>
                </div>

                {/* Table */}
                <div className="mt-px">
                    <div className="overflow-x-auto">
                        <div className="min-w-150">
                            <Table<BetRecord>
                                title={`${activeTab === "casino" ? "카지노" : "슬롯"} 베팅내역 (${totalCount})`}
                                columns={BET_COLUMNS}
                                data={tableData}
                                isLoading={loading}
                                trClassName="bg-panel"
                                cellClassName="border-r border-line border-b"
                            />
                        </div>
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AuthGuard>
    );
};

export default BetHistoryPage;
