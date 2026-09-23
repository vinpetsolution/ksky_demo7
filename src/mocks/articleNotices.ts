export type ArticleNoticeMock = {
  id: string;
  title: string;
  snippet: string;
  writer: string;
  date: string;
};

export const ARTICLE_NOTICE_MOCKS: ArticleNoticeMock[] = [
  {
    id: "1",
    title: "카지노 & 슬롯 게임 시스템 점검 안내",
    snippet: "안녕하세요 좋은 날되세요",
    writer: "관리자",
    date: "2024-07-03",
  },
  {
    id: "2",
    title: "★ 반드시 공지사항 필독 해주세요 ★",
    snippet: "★★ 이용자 필독사항 ★★",
    writer: "관리자",
    date: "2024-07-02",
  },
  {
    id: "3",
    title: "미니 게임 유의사항",
    snippet: "글을 잘 읽으시길 바랍니다.",
    writer: "관리자",
    date: "2024-07-02",
  },
  {
    id: "4",
    title: "★ 반드시 공지사항 필독 해주세요 ★",
    snippet:
      "★★ 이용자 필독사항 ★★ 1. 입금시 반드시 계좌번호를 확인하시고 입금해주세요. 2. 출금시 반드시 본인 명의 계좌로만 출금 가능합니다.",
    writer: "관리자",
    date: "2024-07-01",
  },
];
